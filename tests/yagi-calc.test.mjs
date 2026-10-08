import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { calculateYagiJs } from "../app/lib/yagi-calc.ts";
import initWasm, { calculate_yagi_json } from "../wasm/antenna/pkg/antenna.js";

const wasmBytes = await readFile(
  new URL("../wasm/antenna/pkg/antenna_bg.wasm", import.meta.url),
);
await initWasm({ module_or_path: wasmBytes });

const baseConfig = {
  frequency: 435,
  elementCount: 5,
  elementDiameter: 4,
  boomDiameter: 20,
  boomShape: "round",
  mountMethod: "none",
  feedGap: 10,
  drivenElementType: "folded",
  spacingType: "dl6wu",
  manualSpacing: 0,
  manualBCFactor: 0.7,
  material: "fiberglass",
};

function calculateCompiledWasm(config) {
  const result = JSON.parse(
    calculate_yagi_json(
      JSON.stringify({
        frequency: config.frequency,
        element_count: config.elementCount,
        element_diameter: config.elementDiameter,
        boom_diameter: config.boomDiameter,
        boom_shape: config.boomShape,
        mount_method: config.mountMethod,
        feed_gap: config.feedGap,
        driven_element_type: config.drivenElementType,
        spacing_type: config.spacingType,
        manual_spacing: config.manualSpacing,
        manual_bc_factor: config.manualBCFactor,
        material: config.material,
      }),
    ),
  );
  assert.equal(result.error, undefined);
  return result;
}

test("compiled WASM and JS agree for diameter changes and nonmetal booms", () => {
  for (const material of ["aluminum", "fiberglass"]) {
    for (const mountMethod of ["none", "insulated", "bonded"]) {
      for (const elementDiameter of [4, 8]) {
        const config = {
          ...baseConfig,
          material,
          mountMethod,
          elementDiameter,
        };
        const js = calculateYagiJs(config);
        const wasm = calculateCompiledWasm(config);
        assert.equal(js.estimatedGain, wasm.estimated_gain);
        assert.equal(js.bcFactor, wasm.bc_factor);
        assert.equal(js.elements.length, wasm.elements.length);
        for (let i = 0; i < js.elements.length; i++) {
          assert.ok(
            Math.abs(js.elements[i].cutLength - wasm.elements[i].cut_length) <
              1e-9,
            `element ${i} differs at ${material}, ${mountMethod}, ${elementDiameter} mm`,
          );
        }
      }
    }
  }
});

test("fiberglass boom stays positive and directors respond to element diameter", () => {
  const thin = calculateCompiledWasm(baseConfig);
  const thick = calculateCompiledWasm({ ...baseConfig, elementDiameter: 8 });
  assert.equal(thin.estimated_gain, 8.15);
  assert.equal(thin.boom_correction, 0);
  assert.ok(thick.elements[2].length < thin.elements[2].length);
  assert.ok(thick.elements[3].length < thin.elements[3].length);
});
