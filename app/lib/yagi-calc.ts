export type BoomShape = "round" | "square";
export type MountMethod =
  | "through_bonded"
  | "through_insulated"
  | "above_bonded"
  | "above_insulated"
  | "non_metal"
  | "bonded"
  | "insulated"
  | "above"
  | "none";

export type AntennaMaterial =
  | "aluminum"
  | "copper"
  | "stainless_steel"
  | "fiberglass";

export type DrivenElementType = "folded" | "straight";
export type SpacingType = "dl6wu" | "uniform";

export interface YagiConfig {
  frequency: number; // MHz
  elementCount: number; // count
  elementDiameter: number; // mm
  boomDiameter: number; // mm
  boomShape: BoomShape;
  mountMethod: MountMethod;
  feedGap: number; // mm
  drivenElementType: DrivenElementType;
  spacingType: SpacingType;
  manualSpacing: number; // in lambda
  manualBCFactor?: number; // Optional override for K factor
  material?: AntennaMaterial; // Boom material, not radiating element material
}

export interface YagiElement {
  type: "REF" | "DE" | "DIR";
  name: string;
  position: number; // cumulative from 0 (mm)
  spacing: number; // dist from previous (mm)
  length: number; // total length (mm)
  halfLength: number; // (mm)
  cutLength: number; // length after gap adjustment (for DE) (mm)
  gap?: number; // (mm)
  style?: DrivenElementType; // "folded" or "straight"
}

export interface YagiDesign {
  config: YagiConfig;
  elements: YagiElement[];
  totalBoomLength: number;
  estimatedGain: number;
  boomCorrection: number; // mm
  bcFactor: number; // k
  wavelength: number;
}

let wasmYagi: Awaited<typeof import("~/utils/yagi-wasm")> | null = null;

async function getWasmModule() {
  if (!wasmYagi) {
    try {
      wasmYagi = await import("~/utils/yagi-wasm");
    } catch {
      // WASM not available
    }
  }
  return wasmYagi;
}

async function calculateYagiWasm(config: YagiConfig): Promise<YagiDesign> {
  const wasm = await getWasmModule();

  if (wasm) {
    try {
      const result = await wasm.calculateYagi({
        frequency: config.frequency,
        elementCount: config.elementCount,
        elementDiameter: config.elementDiameter,
        boomDiameter: config.boomDiameter,
        boomShape: config.boomShape,
        mountMethod: config.mountMethod,
        feedGap: config.feedGap,
        drivenElementType: config.drivenElementType,
        spacingType: config.spacingType,
        manualSpacing: config.manualSpacing,
        manualBCFactor: config.manualBCFactor,
        material: config.material,
      });

      return {
        config,
        elements: result.elements.map((e) => ({
          type: e.elementType,
          name: e.name,
          position: e.position,
          spacing: e.spacing,
          length: e.length,
          halfLength: e.halfLength,
          cutLength: e.cutLength,
          gap: e.gap,
          style: e.style as DrivenElementType,
        })),
        totalBoomLength: result.totalBoomLength,
        estimatedGain: result.estimatedGain,
        boomCorrection: result.boomCorrection,
        bcFactor: result.bcFactor,
        wavelength: result.wavelength,
      };
    } catch {
      // Fall back to JS implementation
    }
  }

  return calculateYagiJs(config);
}

export async function calculateYagi(config: YagiConfig): Promise<YagiDesign> {
  return calculateYagiWasm(config);
}

const REFERENCE_ELEMENT_DIAMETER = 4; // mm; preserves the existing default cut list

// Preserve each parasitic element's approximate reactance when its diameter changes.
// The reference length is the existing 4 mm free-space design; boom correction is separate.
function adjustParasiticLengthForDiameter(
  referenceLength: number,
  wavelength: number,
  diameter: number,
): number {
  if (
    !Number.isFinite(wavelength) ||
    wavelength <= 0 ||
    !Number.isFinite(diameter) ||
    diameter <= 0 ||
    diameter === REFERENCE_ELEMENT_DIAMETER
  ) {
    return referenceLength;
  }

  const slope = (d: number) => 430 * Math.log10((2 * wavelength) / d) - 320;
  const referenceSlope = slope(REFERENCE_ELEMENT_DIAMETER);
  const selectedSlope = slope(diameter);
  if (referenceSlope <= 0 || selectedSlope <= 0) return referenceLength;

  const adjusted =
    (wavelength / 2) *
    (1 +
      ((2 * referenceLength) / wavelength - 1) *
        (referenceSlope / selectedSlope));
  return Number.isFinite(adjusted) && adjusted > 0 ? adjusted : referenceLength;
}

export function calculateYagiJs(config: YagiConfig): YagiDesign {
  const {
    frequency,
    elementCount,
    elementDiameter,
    boomDiameter,
    mountMethod,
    feedGap,
    drivenElementType,
    spacingType,
    manualSpacing,
    manualBCFactor,
  } = config;

  const lambda = 299792.458 / frequency;

  let bcFactor = 0;

  if (
    config.material === "fiberglass" ||
    mountMethod === "none" ||
    mountMethod === "non_metal"
  ) {
    bcFactor = 0;
  } else if (manualBCFactor !== undefined && manualBCFactor !== null) {
    bcFactor = manualBCFactor;
  } else {
    const d = elementDiameter || 0;
    const B = boomDiameter || 0;
    const ratio = d > 0 ? B / d : 0;

    switch (mountMethod) {
      case "above_insulated":
      case "above":
        bcFactor = 0.05;
        break;
      case "through_insulated":
      case "insulated":
        bcFactor = 0.3;
        break;
      case "through_bonded":
      case "bonded":
        if (ratio > 1) {
          bcFactor = 0.35 + 0.23 * Math.log(ratio);
          if (bcFactor > 1) bcFactor = 1.0;
        } else {
          bcFactor = 0;
        }
        break;
      default:
        bcFactor = 0;
    }
  }

  const boomCorrection = bcFactor * boomDiameter;

  const elements: YagiElement[] = [];
  let currentPos = 0;

  const refLen =
    adjustParasiticLengthForDiameter(0.495 * lambda, lambda, elementDiameter) +
    boomCorrection;
  elements.push({
    type: "REF",
    name: "Reflector",
    position: 0,
    spacing: 0,
    length: refLen,
    halfLength: refLen / 2,
    cutLength: refLen,
  });

  const spaceRefToDE =
    spacingType === "uniform" ? manualSpacing * lambda : 0.2 * lambda;
  currentPos += spaceRefToDE;

  const baseLen = 0.473 * lambda;
  const deTotalLen = baseLen + boomCorrection - elementDiameter * 0.5;

  let deCutLen = deTotalLen;
  if (drivenElementType === "straight") {
    deCutLen = deTotalLen - feedGap;
  }

  elements.push({
    type: "DE",
    name: "Driven Element",
    position: currentPos,
    spacing: spaceRefToDE,
    length: deTotalLen,
    halfLength: deTotalLen / 2,
    cutLength: deCutLen,
    gap: feedGap,
    style: drivenElementType,
  });

  for (let i = 1; i <= elementCount - 2; i++) {
    let spacing = 0;

    if (spacingType === "uniform") {
      spacing = manualSpacing * lambda;
    } else {
      if (i === 1) spacing = 0.075 * lambda;
      else if (i === 2) spacing = 0.18 * lambda;
      else if (i === 3) spacing = 0.215 * lambda;
      else if (i === 4) spacing = 0.25 * lambda;
      else {
        let factor = 0.28 + (i - 5) * 0.01;
        if (factor > 0.35) factor = 0.35;
        spacing = factor * lambda;
      }
    }
    currentPos += spacing;

    let lenFactor = 0.455 - (i - 1) * 0.005;
    if (lenFactor < 0.405) lenFactor = 0.405;

    const dirLen =
      adjustParasiticLengthForDiameter(
        lenFactor * lambda,
        lambda,
        elementDiameter,
      ) + boomCorrection;

    elements.push({
      type: "DIR",
      name: `Director ${i}`,
      position: currentPos,
      spacing: spacing,
      length: dirLen,
      halfLength: dirLen / 2,
      cutLength: dirLen,
    });
  }

  const estimatedGain = elementCount * 1.2 + 2.15;

  return {
    config,
    elements,
    totalBoomLength: currentPos,
    estimatedGain,
    boomCorrection,
    bcFactor,
    wavelength: lambda,
  };
}
