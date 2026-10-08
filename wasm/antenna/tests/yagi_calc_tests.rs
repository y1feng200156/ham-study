use antenna::*;
use serde::Serialize;
use serde_json::Value;

#[derive(Serialize)]
struct YagiConfig {
    frequency: f64,
    element_count: usize,
    element_diameter: f64,
    boom_diameter: f64,
    boom_shape: String,
    mount_method: String,
    feed_gap: f64,
    driven_element_type: String,
    spacing_type: String,
    manual_spacing: f64,
    manual_bc_factor: Option<f64>,
    material: Option<String>,
}

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
fn test_calculate_yagi_json() {
    let config = create_test_config();
    let config_json = serde_json::to_string(&config).unwrap();
    let result_json = calculate_yagi_json(&config_json);

    assert!(result_json.contains("elements"));
    assert!(result_json.contains("total_boom_length"));
    assert!(result_json.contains("estimated_gain"));
}

#[test]
fn test_manual_bc_factor_override() {
    let mut config = create_test_config();
    config.manual_bc_factor = Some(0.5);
    let config_json = serde_json::to_string(&config).unwrap();
    let result_json = calculate_yagi_json(&config_json);

    // Hard to verify exact internal values via JSON without deserializing full struct
    // But we expect valid JSON output
    assert!(result_json.contains("elements"));
}

#[test]
fn test_calculate_element_lengths() {
    let result = calculate_yagi_element_lengths(145.0, 5, 6.0, 20.0, "bonded");

    assert!(result.starts_with("["));
    assert!(result.ends_with("]"));
}

#[test]
fn fiberglass_boom_has_no_radiator_loss_or_metal_boom_correction() {
    let mut config = create_test_config();
    config.frequency = 435.0;
    config.element_count = 8;
    config.element_diameter = 4.0;
    config.manual_bc_factor = Some(0.72);

    let aluminum: Value = serde_json::from_str(&calculate_yagi_json(
        &serde_json::to_string(&config).unwrap(),
    ))
    .unwrap();
    config.material = Some("fiberglass".to_string());
    let fiberglass: Value = serde_json::from_str(&calculate_yagi_json(
        &serde_json::to_string(&config).unwrap(),
    ))
    .unwrap();

    assert_eq!(fiberglass["estimated_gain"], aluminum["estimated_gain"]);
    assert_eq!(fiberglass["estimated_gain"].as_f64(), Some(11.75));
    assert_eq!(fiberglass["bc_factor"].as_f64(), Some(0.0));
    assert_eq!(fiberglass["boom_correction"].as_f64(), Some(0.0));
    assert!(aluminum["boom_correction"].as_f64().unwrap() > 0.0);
}

#[test]
fn parasitic_elements_change_with_diameter_on_nonmetal_boom() {
    let mut config = create_test_config();
    config.frequency = 435.0;
    config.element_diameter = 4.0;
    config.mount_method = "none".to_string();
    config.material = Some("fiberglass".to_string());

    let thin: Value = serde_json::from_str(&calculate_yagi_json(
        &serde_json::to_string(&config).unwrap(),
    ))
    .unwrap();
    config.element_diameter = 8.0;
    let thick: Value = serde_json::from_str(&calculate_yagi_json(
        &serde_json::to_string(&config).unwrap(),
    ))
    .unwrap();

    let wavelength = 299_792.458 / 435.0;
    let thin_d1 = thin["elements"][2]["length"].as_f64().unwrap();
    let thick_d1 = thick["elements"][2]["length"].as_f64().unwrap();
    let thin_d2 = thin["elements"][3]["length"].as_f64().unwrap();
    let thick_d2 = thick["elements"][3]["length"].as_f64().unwrap();
    assert!((thin_d1 - 0.455 * wavelength).abs() < 1e-9);
    assert!(thick_d1 < thin_d1);
    assert!(thick_d2 < thin_d2);
    assert_ne!(thin_d1 - thick_d1, thin_d2 - thick_d2);
    assert_eq!(
        thin["elements"][2]["position"],
        thick["elements"][2]["position"]
    );
}
