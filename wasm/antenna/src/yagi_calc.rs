use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// Yagi antenna configuration
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct YagiConfig {
    pub frequency: f64,                // MHz
    pub element_count: usize,          // count
    pub element_diameter: f64,         // mm
    pub boom_diameter: f64,            // mm
    pub boom_shape: String,            // "round" or "square"
    pub mount_method: String,          // mounting method
    pub feed_gap: f64,                 // mm
    pub driven_element_type: String,   // "folded" or "straight"
    pub spacing_type: String,          // "dl6wu" or "uniform"
    pub manual_spacing: f64,           // in lambda
    pub manual_bc_factor: Option<f64>, // Optional override for K factor
    pub material: Option<String>,      // "aluminum", "copper", "stainless_steel", "fiberglass"
}

/// Yagi element information
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct YagiElement {
    pub element_type: String, // "REF", "DE", "DIR"
    pub name: String,
    pub position: f64,         // cumulative from 0 (mm)
    pub spacing: f64,          // dist from previous (mm)
    pub length: f64,           // total length (mm)
    pub half_length: f64,      // (mm)
    pub cut_length: f64,       // length after gap adjustment (for DE) (mm)
    pub gap: Option<f64>,      // (mm) - for DE
    pub style: Option<String>, // "folded" or "straight" - for DE
}

/// Complete Yagi antenna design
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct YagiDesign {
    pub elements: Vec<YagiElement>,
    pub total_boom_length: f64,
    pub estimated_gain: f64,
    pub boom_correction: f64,
    pub bc_factor: f64,
    pub wavelength: f64,
}

/// Calculate advanced boom correction factor (K factor)
fn calculate_bc_factor(
    element_diameter: f64,
    boom_diameter: f64,
    mount_method: &str,
    manual_bc_factor: Option<f64>,
    element_length: f64,
    frequency: f64,
    material: Option<&str>,
) -> f64 {
    // Material describes the boom. A non-conductive boom has no metal-boom correction,
    // even when a stale manual K factor or bonded mounting option was supplied.
    if matches!(material, Some("fiberglass" | "plastic"))
        || matches!(mount_method, "non_metal" | "none")
    {
        return 0.0;
    }

    // Check if manual override is provided
    if let Some(bc) = manual_bc_factor {
        return bc;
    }

    let d = element_diameter;
    let b = boom_diameter;
    let ratio = if d > 0.0 { b / d } else { 0.0 };

    // 1. Base K Value (Mounting Method)
    let k_base = match mount_method {
        "non_metal" | "none" => 0.0,
        "above_insulated" | "above" => 0.05,
        "through_insulated" | "insulated" => 0.30,
        "through_bonded" | "bonded" => 0.70, // Worst case base
        _ => 0.0,
    };

    if k_base < 0.01 {
        return 0.0;
    }

    // 2. Diameter Ratio Correction (VK5DJ / DL6WU compatible for bonded)
    // For bonded, we use the logarithmic relationship
    let k_diameter = if mount_method == "through_bonded" || mount_method == "bonded" {
        if ratio > 1.0 {
            0.35 + 0.23 * ratio.ln()
        } else {
            0.0 // Should not happen for valid yagi
        }
    } else {
        1.0 // Other methods use fixed k_base or have different curves, simplified here to base multiplier
    };

    // 3. Frequency / Skin Depth Correction
    // Skin depth delta = sqrt(2 / (omega * mu * sigma))
    // We simplify to relative factor against Aluminum at VHF
    let mat = material.unwrap_or("aluminum");
    let (conductivity, _permeability) = match mat {
        "copper" => (5.8e7, 1.0),
        "aluminum" => (3.5e7, 1.0),
        "stainless_steel" => (1.1e6, 100.0), // High permeability, low conductivity
        "fiberglass" | "plastic" => (0.0, 1.0),
        _ => (3.5e7, 1.0), // Default to Aluminum
    };

    if conductivity < 1.0 {
        return 0.0; // Non-conductive boom has no effect (if properly implemented in mount_method logic)
    }

    // Skin depth calculation
    // delta = 503 * sqrt(1 / (f_Hz * mu_r * sigma)) is approx
    // relative correction factor logic
    // Using frequency to adjust skin depth impact slightly if needed, but for now just use mat
    let _ = frequency;

    let k_material = match mat {
        "aluminum" => 1.0,
        "copper" => 1.0,           // Copper is better but similar effect range
        "stainless_steel" => 0.85, // Higher resistance reduces the effective coupling length slightly
        _ => 1.0,
    };

    // 4. Element Length Correction (Shortening effect is less for very long elements relative to boom)
    // This is a subtle 2nd order effect, usually negligible for standard VHF/UHF Yagis
    // We keep it 1.0 for now to match DL6WU unless extreme
    let _k_length = 1.0;

    // Use element_length just to suppress warning for now, in future we can use it
    let _ = element_length;

    // Combine factors
    // If bonded: use the diameter formula directly (it includes base effect) * material
    // If insulated: use base constant * material (simplified)

    let k_final = if mount_method == "through_bonded" || mount_method == "bonded" {
        k_diameter * k_material
    } else {
        k_base * k_material
    };

    if k_final > 1.0 {
        1.0
    } else {
        k_final
    }
}

const REFERENCE_ELEMENT_DIAMETER: f64 = 4.0; // mm; existing default cut list

// Equal-reactance diameter scaling of each parasitic element before boom correction.
// This keeps the existing 4 mm design as the reference (DL6WU/G3SEK method).
fn adjust_parasitic_length_for_diameter(
    reference_length: f64,
    wavelength: f64,
    diameter: f64,
) -> f64 {
    if !wavelength.is_finite()
        || wavelength <= 0.0
        || !diameter.is_finite()
        || diameter <= 0.0
        || diameter == REFERENCE_ELEMENT_DIAMETER
    {
        return reference_length;
    }

    let slope = |d: f64| 430.0 * (2.0 * wavelength / d).log10() - 320.0;
    let reference_slope = slope(REFERENCE_ELEMENT_DIAMETER);
    let selected_slope = slope(diameter);
    if reference_slope <= 0.0 || selected_slope <= 0.0 {
        return reference_length;
    }

    let adjusted = wavelength / 2.0
        * (1.0 + (2.0 * reference_length / wavelength - 1.0) * reference_slope / selected_slope);
    if adjusted.is_finite() && adjusted > 0.0 {
        adjusted
    } else {
        reference_length
    }
}

/// Internal calculation function
fn calculate_yagi_internal(config: &YagiConfig) -> YagiDesign {
    let frequency = config.frequency;
    let element_count = config.element_count;
    let element_diameter = config.element_diameter;
    let boom_diameter = config.boom_diameter;
    let mount_method = config.mount_method.as_str();
    let feed_gap = config.feed_gap;
    let driven_element_type = config.driven_element_type.as_str();
    let spacing_type = config.spacing_type.as_str();
    let manual_spacing = config.manual_spacing;
    let manual_bc_factor = config.manual_bc_factor;
    let material = config.material.as_deref();

    // 1. Calculate wavelength
    let lambda = 299_792.458 / frequency; // mm

    // 2. Calculate Boom Correction Factor
    let bc_factor = calculate_bc_factor(
        element_diameter,
        boom_diameter,
        mount_method,
        manual_bc_factor,
        0.5 * lambda, // Estimate element length as half wave for BC calc
        frequency,
        material,
    );
    let boom_correction = bc_factor * boom_diameter;

    // 3. Calculate Elements
    let mut elements: Vec<YagiElement> = Vec::new();
    let mut current_pos = 0.0;

    // --- Reflector ---
    let ref_len = adjust_parasitic_length_for_diameter(0.495 * lambda, lambda, element_diameter)
        + boom_correction;
    elements.push(YagiElement {
        element_type: "REF".to_string(),
        name: "Reflector".to_string(),
        position: 0.0,
        spacing: 0.0,
        length: ref_len,
        half_length: ref_len / 2.0,
        cut_length: ref_len,
        gap: None,
        style: None,
    });

    // --- Driven Element (DE) ---
    let space_ref_to_de = if spacing_type == "uniform" {
        manual_spacing * lambda
    } else {
        0.2 * lambda
    };
    current_pos += space_ref_to_de;

    // DE Length calculation
    let base_len = 0.473 * lambda;
    let de_total_len = base_len + boom_correction - element_diameter * 0.5;

    let de_cut_len = if driven_element_type == "straight" {
        de_total_len - feed_gap
    } else {
        de_total_len
    };

    elements.push(YagiElement {
        element_type: "DE".to_string(),
        name: "Driven Element".to_string(),
        position: current_pos,
        spacing: space_ref_to_de,
        length: de_total_len,
        half_length: de_total_len / 2.0,
        cut_length: de_cut_len,
        gap: Some(feed_gap),
        style: Some(driven_element_type.to_string()),
    });

    // --- Directors ---
    for i in 1..=(element_count - 2) {
        let spacing = if spacing_type == "uniform" {
            manual_spacing * lambda
        } else {
            // DL6WU Spacing Model
            match i {
                1 => 0.075 * lambda,
                2 => 0.18 * lambda,
                3 => 0.215 * lambda,
                4 => 0.25 * lambda,
                _ => {
                    let factor = 0.28 + (i - 5) as f64 * 0.01;
                    let factor = if factor > 0.35 { 0.35 } else { factor };
                    factor * lambda
                }
            }
        };
        current_pos += spacing;

        // DL6WU Length Model
        let mut len_factor = 0.455 - (i - 1) as f64 * 0.005;
        if len_factor < 0.405 {
            len_factor = 0.405;
        }

        let dir_len =
            adjust_parasitic_length_for_diameter(len_factor * lambda, lambda, element_diameter)
                + boom_correction;

        elements.push(YagiElement {
            element_type: "DIR".to_string(),
            name: format!("Director {}", i),
            position: current_pos,
            spacing,
            length: dir_len,
            half_length: dir_len / 2.0,
            cut_length: dir_len,
            gap: None,
            style: None,
        });
    }

    // 4. Final Estimates
    let estimated_gain = estimate_yagi_gain(element_count, material.unwrap_or("aluminum"));

    YagiDesign {
        elements,
        total_boom_length: current_pos,
        estimated_gain,
        boom_correction,
        bc_factor,
        wavelength: lambda,
    }
}

/// Calculate Yagi-Uda antenna dimensions based on DL6WU and VK5DJ models.
///
/// # Arguments
/// * `config_json` - JSON string containing YagiConfig
///
/// # Returns
/// JSON string containing YagiDesign
#[wasm_bindgen]
pub fn calculate_yagi_json(config_json: &str) -> String {
    let config: YagiConfig = match serde_json::from_str(config_json) {
        Ok(c) => c,
        Err(_) => return "{\"error\": \"Invalid config JSON\"}".to_string(),
    };

    let design = calculate_yagi_internal(&config);

    match serde_json::to_string(&design) {
        Ok(json) => json,
        Err(_) => "{\"error\": \"Failed to serialize result\"}".to_string(),
    }
}

/// Calculate a rough gain estimate based on element count.
///
/// `material` is retained for API compatibility and describes the boom, not the elements.
#[wasm_bindgen]
pub fn estimate_yagi_gain(element_count: usize, _material: &str) -> f64 {
    element_count as f64 * 1.2 + 2.15
}

/// Calculate boom correction factor and amount
///
/// # Arguments
/// * `element_diameter` - Element diameter in mm
/// * `boom_diameter` - Boom diameter in mm
/// * `mount_method` - Mounting method string
///
/// # Returns
/// JSON object with {bc_factor, correction_mm}
#[wasm_bindgen]
pub fn calculate_boom_correction_json(
    element_diameter: f64,
    boom_diameter: f64,
    mount_method: &str,
) -> String {
    let bc_factor = calculate_bc_factor(
        element_diameter,
        boom_diameter,
        mount_method,
        None,
        1000.0,
        145.0,
        None,
    );
    let correction = bc_factor * boom_diameter;

    format!(
        "{{\"bc_factor\": {}, \"correction_mm\": {}}}",
        bc_factor, correction
    )
}

/// Calculate Yagi element lengths only (simplified API)
///
/// # Arguments
/// * `frequency` - Frequency in MHz
/// * `element_count` - Number of elements
/// * `element_diameter` - Element diameter in mm
/// * `boom_diameter` - Boom diameter in mm
/// * `mount_method` - Mount method string
///
/// # Returns
/// JSON array of element lengths in mm
#[wasm_bindgen]
pub fn calculate_yagi_element_lengths(
    frequency: f64,
    element_count: usize,
    element_diameter: f64,
    boom_diameter: f64,
    mount_method: &str,
) -> String {
    let config = YagiConfig {
        frequency,
        element_count,
        element_diameter,
        boom_diameter,
        boom_shape: "round".to_string(),
        mount_method: mount_method.to_string(),
        feed_gap: 10.0,
        driven_element_type: "straight".to_string(),
        spacing_type: "dl6wu".to_string(),
        manual_spacing: 0.2,
        manual_bc_factor: None,
        material: None,
    };

    let design = calculate_yagi_internal(&config);
    let lengths: Vec<f64> = design.elements.iter().map(|e| e.length).collect();

    match serde_json::to_string(&lengths) {
        Ok(json) => json,
        Err(_) => "[]".to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn create_test_config() -> YagiConfig {
        YagiConfig {
            frequency: 145.0,
            element_count: 5,
            element_diameter: 6.0,
            boom_diameter: 20.0,
            boom_shape: "round".to_string(),
            mount_method: "bonded".to_string(),
            feed_gap: 10.0,
            driven_element_type: "straight".to_string(),
            spacing_type: "dl6wu".to_string(),
            manual_spacing: 0.2,
            manual_bc_factor: None,
            material: Some("aluminum".to_string()),
        }
    }

    #[test]
    fn test_calculate_yagi_basic() {
        let config = create_test_config();
        let design = calculate_yagi_internal(&config);

        assert_eq!(design.elements.len(), config.element_count);
        assert_eq!(design.elements[0].element_type, "REF");
        assert_eq!(design.elements[1].element_type, "DE");

        for i in 2..design.elements.len() {
            assert_eq!(design.elements[i].element_type, "DIR");
        }

        let expected_wavelength = 299_792.458 / 145.0;
        assert!((design.wavelength - expected_wavelength).abs() < 0.1);
        assert!(design.estimated_gain > 0.0);
    }

    #[test]
    fn test_boom_correction_calculation() {
        // Bonded
        let k_bonded =
            calculate_bc_factor(6.0, 20.0, "bonded", None, 1000.0, 145.0, Some("aluminum"));
        assert!(k_bonded > 0.6); // Should be around 0.6-0.7

        // Insulated
        let k_insulated = calculate_bc_factor(
            6.0,
            20.0,
            "insulated",
            None,
            1000.0,
            145.0,
            Some("aluminum"),
        );
        assert!(k_insulated < 0.4 && k_insulated > 0.2); // Around 0.3

        // None
        let k_none = calculate_bc_factor(6.0, 20.0, "none", None, 1000.0, 145.0, Some("aluminum"));
        assert_eq!(k_none, 0.0);

        // Stainless Steel vs Aluminum (Bonded)
        let k_ss = calculate_bc_factor(
            6.0,
            20.0,
            "bonded",
            None,
            1000.0,
            145.0,
            Some("stainless_steel"),
        );
        let k_al = calculate_bc_factor(6.0, 20.0, "bonded", None, 1000.0, 145.0, Some("aluminum"));

        assert!(
            k_ss < k_al,
            "Stainless steel should have lower correction factor than aluminum"
        );
    }

    #[test]
    fn test_manual_bc_factor_override() {
        let mut config = create_test_config();
        config.manual_bc_factor = Some(0.5);

        let design = calculate_yagi_internal(&config);
        assert!((design.bc_factor - 0.5).abs() < 0.001);
    }

    #[test]
    fn test_uniform_spacing() {
        let mut config = create_test_config();
        config.spacing_type = "uniform".to_string();
        config.manual_spacing = 0.25;

        let design = calculate_yagi_internal(&config);

        for i in 2..design.elements.len() {
            let expected_spacing = 0.25 * design.wavelength;
            assert!((design.elements[i].spacing - expected_spacing).abs() < 0.1);
        }
    }

    #[test]
    fn test_estimate_gain() {
        let gain_3 = estimate_yagi_gain(3, "aluminum");
        let gain_5 = estimate_yagi_gain(5, "aluminum");
        let gain_10 = estimate_yagi_gain(10, "aluminum");

        assert!(gain_5 > gain_3);
        assert!(gain_10 > gain_5);
        assert!((gain_5 - (5.0 * 1.2 + 2.15)).abs() < 0.001);
    }

    #[test]
    fn test_folded_vs_straight_driven_element() {
        let mut config = create_test_config();

        config.driven_element_type = "straight".to_string();
        let design_straight = calculate_yagi_internal(&config);

        config.driven_element_type = "folded".to_string();
        let design_folded = calculate_yagi_internal(&config);

        let de_straight = &design_straight.elements[1];
        let de_folded = &design_folded.elements[1];

        assert!((de_straight.cut_length - (de_straight.length - config.feed_gap)).abs() < 0.001);
        assert!((de_folded.cut_length - de_folded.length).abs() < 0.001);
    }
}
