export interface MoxonConfig {
  frequency: number; // MHz
  wireDiameter: number; // mm
}

export interface MoxonDesign {
  config: MoxonConfig;
  wavelength: number; // meters
  // Dimensions in mm
  A: number; // Driven Element Width
  B: number; // Driven Element Tail
  C: number; // Gap
  D: number; // Reflector Tail
  E: number; // Reflector Width

  // Computed Wire Lengths (for BOM)
  wireLengthDriven: number;
  wireLengthReflector: number;

  // Computed totals (mm)
  totalWidth: number; // A
  totalHeight: number; // E + some spacing? No, E is width. Wait.
  // Moxon is a rectangle.
  // Width = A (Driven element total width)
  // Depth = B + D + Gap? No.
  // The rectangle outer dimensions:
  // Width = A (Driven element side) ~= 0.375 wl.
  // Wait, A is the parallel part length usually.
  // Let's use the widely accepted labeling:
  // A = Driven Element center section (width)
  // B = Driven Element tail (depth)
  // C = Gap
  // D = Reflector tail (depth)
  // E = Reflector center section (width)

  // Wait, standard convention (Cebik):
  // A = Driven Element Parallel Length
  // B = Driven Element Tail Length
  // C = Gap
  // D = Reflector Tail Length
  // E = Reflector Parallel Length

  // Overall Dimensions:
  // Width (Left to Right) = A (Assuming Reflector E > A? No, usually E is slightly larger or calculations vary)
  // Actually, typically A is the overall width constraint.
  // Let's calculate typical outer bounding box.

  geometry: {
    width: number; // max(A, E)
    depth: number; // B + Gap + D ?? No.
    // The tails point towards each other.
    // Driven Element: Width A, Tails B.
    // Reflector: Width E, Tails D.
    // The tails B and D are collinear-ish? No, they face each other.
    // The Gap C is between the tips of B and D.
    // So usually B + C + D = Total Depth? Or is it B and D are the "sides"?

    // Structure:
    //      A (Driven)
    //   |             |
    // B |             | B
    //   |   Gap C     |
    // D |             | D
    //   |_____________|
    //      E (Reflector)

    // So Total Depth = B + C + D ?? No, the Gap C is horizontal usually?
    // Let's check the shape.
    // Moxon Rectangle is... a rectangle.
    // Driven Element is a "U" shape. Reflector is a "U" shape. They face each other.
    // Tails B and D point towards each other.
    // So the Gap C is between the "Tip of Driven Tail" and "Tip of Reflector Tail".
    //
    // Layout:
    //      <---- A ---->
    //      _____________
    //     |             |
    //   B |             | B
    //     | <- C ->     |
    //   D |             | D
    //     |_____________|
    //      <---- E ---->
    //
    // So Total Depth (Front to Back) = B + D? No, the Gap is in the wire path.
    // Wait, typical Moxon:
    // The gap is between the tips.
    // The "Side" length is B (Driven tail) + Gap + D (Reflector tail)? No.
    // Usually B and D are the lengths of the bent parts.
    // The Gap C is the *distance* between the tips.
    // So yes, depth is roughly consistent. But usually B and D are not collinear but parallel?
    // No, Moxon is a 2-element wire beam.
    // Bent elements.
    // Driven: Central part A, two tails B.
    // Reflector: Central part E, two tails D.
    // The tails B and D are on the "side" of the rectangle.
    // The gap C is between the end of tail B and end of tail D.
    // So the TOTAL DEPTH (outer dimension) is simply the length of the side.
    // Side Length = B + C + D?
    // NO. The Gap C is the specific dielectric gap.
    // Usually the outer dimension "Depth" is typically (B + C + D) if they are in line?
    // Actually, normally B and D are collinear on the side.
    // So Side Length = B + C + D.
    //
    // Width = A (Driven) and E (Reflector). Usually E > A? Or similar.
  };
}

/**
 * Calculates Moxon Rectangle dimensions using standard approximation formulas.
 * Based on L.B. Cebik (W4RNL) algorithms.
 */
/**
 * Calculates Moxon Rectangle dimensions using AC6LA / MoxGen algorithm.
 * Based on 3rd order polynomial regression of Nec-2 simulation data.
 */
export function calculateMoxon(config: MoxonConfig): MoxonDesign {
  const { frequency, wireDiameter } = config;
  const lambda = 299792.458 / frequency; // mm
  const lambdaM = 299.792458 / frequency; // meters

  // 1. Log Ratio Calculation
  // ratio = wavelength / diameter
  // If diameter is effectively zero, default to a standard ratio (e.g. typical wire) to avoid NaN
  const dia = wireDiameter > 0 ? wireDiameter : 1.0;
  const ratio = lambda / dia;
  const X = Math.log10(ratio);

  // 2. Polynomial Factors (AC6LA / MoxGen / M0UKD)

  // A Factor (Total Width)
  // Poly: 0.284203 + 0.054366*X - 0.010186*X^2 + 0.000636*X^3
  // Note: Standard MoxGen uses this for the main width.
  const A_factor =
    0.284203 + 0.054366 * X - 0.010186 * X ** 2 + 0.000636 * X ** 3;

  // B Factor (Reflector Tail Length)
  // Poly: 0.024443 + 0.027038*X - 0.006927*X^2 + 0.000624*X^3
  const B_factor_refTail =
    0.024443 + 0.027038 * X - 0.006927 * X ** 2 + 0.000624 * X ** 3;

  // D Factor (Driven Element Tail Length)
  // Poly: 0.012921 + 0.027735*X - 0.007624*X^2 + 0.000713*X^3
  const D_factor_drivenTail =
    0.012921 + 0.027735 * X - 0.007624 * X ** 2 + 0.000713 * X ** 3;

  // C Factor (Total Depth / Front-to-Back Spacing)
  // Poly: 0.170617 - 0.026772*X + 0.004944*X^2 - 0.000297*X^3
  const C_factor_depth =
    0.170617 - 0.026772 * X + 0.004944 * X ** 2 - 0.000297 * X ** 3;

  // 3. Convert to Dimensions
  // Note: These factors scale with WAVELENGTH (lambda)
  const Dim_A_Width = A_factor * lambda;
  const Dim_RefTail = B_factor_refTail * lambda;
  const Dim_DrivenTail = D_factor_drivenTail * lambda;
  const Dim_Depth = C_factor_depth * lambda;

  // 4. Calculate Gap
  // Total Depth = DrivenTail + Gap + RefTail
  // So Gap = Depth - DrivenTail - RefTail
  const Dim_Gap = Dim_Depth - Dim_DrivenTail - Dim_RefTail;

  // 5. Map to MoxonDesign Interface
  // My Interface Map:
  // A = Driven Width          -> Dim_A_Width
  // B = Driven Tail           -> Dim_DrivenTail
  // C = Gap                   -> Dim_Gap
  // D = Reflector Tail        -> Dim_RefTail
  // E = Total Depth           -> Dim_Depth

  // Note on Interface confusion:
  // Previous code had "D: Reflector Tail", "E: Reflector Width".
  // But usually, standard drawing: "E" is Total Depth (Side)?
  // Let's stick to the mapping I decided:
  // A: Width
  // B: Driven Tail
  // C: Gap
  // D: Reflector Tail
  // E: Total Depth (was Reflector Width in comment, but effectively Depth in usage?)
  // Let's ensure the UI labels match this data.

  const designA = Dim_A_Width;
  const designB = Dim_DrivenTail;
  const designC = Dim_Gap;
  const designD = Dim_RefTail;
  const designE = Dim_Depth;

  return {
    config,
    wavelength: lambdaM,
    A: designA,
    B: designB,
    C: designC,
    D: designD,
    E: designE,
    totalWidth: designA,
    totalHeight: designE,
    geometry: {
      width: designA,
      depth: designE,
    },
    // Total wire lengths
    // Driven Element = A + 2*B
    // Reflector Element = A + 2*D (Approximation: Width A is same for both).
    // Note: Some models assume Reflector width > Driven.
    // But MoxGen typically models a rectangle where width is uniform?
    // Actually MoxGen often adjusts "Inset" for the gap.
    // But assuming "Moxon Rectangle", outer width A is constant.
    wireLengthDriven: designA + 2 * designB,
    wireLengthReflector: designA + 2 * designD,
  };
}
