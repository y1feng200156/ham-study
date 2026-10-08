/* @ts-self-types="./antenna.d.ts" */

/**
 * 信号路径点
 */
export class PathPoint {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PathPointFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pathpoint_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get is_impact() {
        const ret = wasm.__wbg_get_pathpoint_is_impact(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_pathpoint_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_pathpoint_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_pathpoint_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {boolean} arg0
     */
    set is_impact(arg0) {
        wasm.__wbg_set_pathpoint_is_impact(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_pathpoint_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_pathpoint_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_pathpoint_z(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) PathPoint.prototype[Symbol.dispose] = PathPoint.prototype.free;

/**
 * 传播模式
 * @enum {0 | 1}
 */
export const PropagationMode = Object.freeze({
    HF: 0, "0": "HF",
    UV: 1, "1": "UV",
});

/**
 * 传播计算参数
 */
export class PropagationParams {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PropagationParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_propagationparams_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get angle() {
        const ret = wasm.__wbg_get_pathpoint_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get critical_frequency() {
        const ret = wasm.__wbg_get_propagationparams_critical_frequency(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get earth_radius() {
        const ret = wasm.__wbg_get_propagationparams_earth_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get frequency() {
        const ret = wasm.__wbg_get_pathpoint_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get iono_height() {
        const ret = wasm.__wbg_get_pathpoint_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get max_hops() {
        const ret = wasm.__wbg_get_propagationparams_max_hops(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {PropagationMode}
     */
    get mode() {
        const ret = wasm.__wbg_get_propagationparams_mode(this.__wbg_ptr);
        return ret;
    }
    constructor() {
        const ret = wasm.propagationparams_new();
        this.__wbg_ptr = ret >>> 0;
        PropagationParamsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} arg0
     */
    set angle(arg0) {
        wasm.__wbg_set_pathpoint_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set critical_frequency(arg0) {
        wasm.__wbg_set_propagationparams_critical_frequency(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set earth_radius(arg0) {
        wasm.__wbg_set_propagationparams_earth_radius(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set frequency(arg0) {
        wasm.__wbg_set_pathpoint_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set iono_height(arg0) {
        wasm.__wbg_set_pathpoint_z(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set max_hops(arg0) {
        wasm.__wbg_set_propagationparams_max_hops(this.__wbg_ptr, arg0);
    }
    /**
     * @param {PropagationMode} arg0
     */
    set mode(arg0) {
        wasm.__wbg_set_propagationparams_mode(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) PropagationParams.prototype[Symbol.dispose] = PropagationParams.prototype.free;

/**
 * 传播统计信息
 */
export class PropagationStats {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PropagationStats.prototype);
        obj.__wbg_ptr = ptr;
        PropagationStatsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PropagationStatsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_propagationstats_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ground_wave_strength() {
        const ret = wasm.__wbg_get_pathpoint_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get incidence_angle() {
        const ret = wasm.__wbg_get_pathpoint_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get is_penetrating() {
        const ret = wasm.__wbg_get_pathpoint_is_impact(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get muf() {
        const ret = wasm.__wbg_get_pathpoint_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set ground_wave_strength(arg0) {
        wasm.__wbg_set_pathpoint_z(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set incidence_angle(arg0) {
        wasm.__wbg_set_pathpoint_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set is_penetrating(arg0) {
        wasm.__wbg_set_pathpoint_is_impact(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set muf(arg0) {
        wasm.__wbg_set_pathpoint_y(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) PropagationStats.prototype[Symbol.dispose] = PropagationStats.prototype.free;

/**
 * 球面几何体生成参数
 */
export class SphericalSurfaceParams {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SphericalSurfaceParamsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sphericalsurfaceparams_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get max_angle() {
        const ret = wasm.__wbg_get_sphericalsurfaceparams_max_angle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get radius() {
        const ret = wasm.__wbg_get_sphericalsurfaceparams_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get segments_r() {
        const ret = wasm.__wbg_get_sphericalsurfaceparams_segments_r(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get segments_w() {
        const ret = wasm.__wbg_get_sphericalsurfaceparams_segments_w(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get spread_angle() {
        const ret = wasm.__wbg_get_sphericalsurfaceparams_spread_angle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set max_angle(arg0) {
        wasm.__wbg_set_sphericalsurfaceparams_max_angle(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set radius(arg0) {
        wasm.__wbg_set_sphericalsurfaceparams_radius(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set segments_r(arg0) {
        wasm.__wbg_set_sphericalsurfaceparams_segments_r(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set segments_w(arg0) {
        wasm.__wbg_set_sphericalsurfaceparams_segments_w(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set spread_angle(arg0) {
        wasm.__wbg_set_sphericalsurfaceparams_spread_angle(this.__wbg_ptr, arg0);
    }
    constructor() {
        const ret = wasm.sphericalsurfaceparams_new();
        this.__wbg_ptr = ret >>> 0;
        SphericalSurfaceParamsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) SphericalSurfaceParams.prototype[Symbol.dispose] = SphericalSurfaceParams.prototype.free;

/**
 * Calculate boom correction factor and amount
 *
 * # Arguments
 * * `element_diameter` - Element diameter in mm
 * * `boom_diameter` - Boom diameter in mm
 * * `mount_method` - Mounting method string
 *
 * # Returns
 * JSON object with {bc_factor, correction_mm}
 * @param {number} element_diameter
 * @param {number} boom_diameter
 * @param {string} mount_method
 * @returns {string}
 */
export function calculate_boom_correction_json(element_diameter, boom_diameter, mount_method) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(mount_method, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.calculate_boom_correction_json(element_diameter, boom_diameter, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * WASM-exposed function to calculate electric field
 *
 * # Arguments
 * * `antenna_type` - Type of antenna ("vertical", "gp", "dp", "yagi", etc.)
 * * `polarization_type` - Polarization type ("vertical", "horizontal", "circular", "elliptical")
 * * `speed` - Animation speed multiplier
 * * `amplitude_scale` - Amplitude scaling factor
 * * `is_rhcp` - Right-hand circular polarization flag
 * * `antenna_length` - Antenna length parameter
 * * `radial_angle` - Radial angle string ("60", "135", etc.)
 * * `active_harmonic` - Active harmonic number
 * * `is_inverted_v` - Inverted V flag for Windom antenna
 * * `time` - Current time for animation
 * * `ground_height` - Antenna height above ground in wavelengths (0.0 = free space)
 * * `grid_size` - Size of the grid (grid_size x grid_size)
 * * `spacing` - Spacing between grid points
 * * `matrix_buffer` - Output buffer for instance matrices (16 floats per instance)
 * * `color_buffer` - Output buffer for instance colors (3 floats per instance)
 * @param {string} antenna_type
 * @param {string} polarization_type
 * @param {number} speed
 * @param {number} amplitude_scale
 * @param {boolean} is_rhcp
 * @param {number} antenna_length
 * @param {string} radial_angle
 * @param {number} active_harmonic
 * @param {boolean} is_inverted_v
 * @param {number} time
 * @param {number} ground_height
 * @param {number} grid_size
 * @param {number} spacing
 * @param {Float32Array} matrix_buffer
 * @param {Float32Array} color_buffer
 */
export function calculate_electric_field(antenna_type, polarization_type, speed, amplitude_scale, is_rhcp, antenna_length, radial_angle, active_harmonic, is_inverted_v, time, ground_height, grid_size, spacing, matrix_buffer, color_buffer) {
    const ptr0 = passStringToWasm0(antenna_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(polarization_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(radial_angle, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    var ptr3 = passArrayF32ToWasm0(matrix_buffer, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    var ptr4 = passArrayF32ToWasm0(color_buffer, wasm.__wbindgen_malloc);
    var len4 = WASM_VECTOR_LEN;
    wasm.calculate_electric_field(ptr0, len0, ptr1, len1, speed, amplitude_scale, is_rhcp, antenna_length, ptr2, len2, active_harmonic, is_inverted_v, time, ground_height, grid_size, spacing, ptr3, len3, matrix_buffer, ptr4, len4, color_buffer);
}

/**
 * 计算地波最大角度 (弧度)
 * @param {number} strength
 * @returns {number}
 */
export function calculate_ground_wave_angle(strength) {
    const ret = wasm.calculate_ground_wave_angle(strength);
    return ret;
}

/**
 * 计算地波强度
 *
 * 地波强度随频率增加而衰减
 * @param {number} frequency
 * @returns {number}
 */
export function calculate_ground_wave_strength(frequency) {
    const ret = wasm.calculate_ground_wave_strength(frequency);
    return ret;
}

/**
 * Calculate the polynomial factors for educational/display purposes
 *
 * Returns the raw polynomial factors used in the calculation
 *
 * # Arguments
 * * `frequency` - Frequency in MHz
 * * `wire_diameter` - Wire diameter in mm
 *
 * # Returns
 * JSON object with {A_factor, B_factor, D_factor, C_factor}
 * @param {number} frequency
 * @param {number} wire_diameter
 * @returns {string}
 */
export function calculate_moxon_factors_json(frequency, wire_diameter) {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.calculate_moxon_factors_json(frequency, wire_diameter);
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Calculate Moxon Rectangle dimensions using AC6LA / MoxGen algorithm.
 * Based on 3rd order polynomial regression of Nec-2 simulation data.
 *
 * # Arguments
 * * `config_json` - JSON string containing MoxonConfig
 *
 * # Returns
 * JSON string containing MoxonDesign
 * @param {string} config_json
 * @returns {string}
 */
export function calculate_moxon_json(config_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.calculate_moxon_json(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Calculate Moxon dimensions for specific frequency and wire size
 *
 * Simplified API for quick calculations
 *
 * # Arguments
 * * `frequency` - Frequency in MHz
 * * `wire_diameter` - Wire diameter in mm
 *
 * # Returns
 * JSON object with {width_mm, depth_mm, driven_wire_length_mm, reflector_wire_length_mm}
 * @param {number} frequency
 * @param {number} wire_diameter
 * @returns {string}
 */
export function calculate_moxon_simple_json(frequency, wire_diameter) {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.calculate_moxon_simple_json(frequency, wire_diameter);
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Calculate antenna gain for a specific direction
 *
 * # Arguments
 * * `antenna_type` - Type of antenna
 * * `dir_x` - Direction vector X component (normalized)
 * * `dir_y` - Direction vector Y component (normalized)
 * * `dir_z` - Direction vector Z component (normalized)
 *
 * # Returns
 * Gain value (0.0 to 1.0)
 * @param {string} antenna_type
 * @param {number} dir_x
 * @param {number} dir_y
 * @param {number} dir_z
 * @returns {number}
 */
export function calculate_pattern_gain(antenna_type, dir_x, dir_y, dir_z) {
    const ptr0 = passStringToWasm0(antenna_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.calculate_pattern_gain(ptr0, len0, dir_x, dir_y, dir_z);
    return ret;
}

/**
 * Calculate gain pattern for a grid of points
 *
 * This is optimized for Poynting vector field visualization
 *
 * # Arguments
 * * `antenna_type` - Type of antenna
 * * `positions_x` - Array of X positions
 * * `positions_z` - Array of Z positions (same length as positions_x)
 * * `center_skip_radius` - Radius around center to skip (usually the antenna location)
 * * `output` - Output buffer for gain values
 * @param {string} antenna_type
 * @param {Float64Array} positions_x
 * @param {Float64Array} positions_z
 * @param {number} center_skip_radius
 * @param {Float64Array} output
 */
export function calculate_pattern_gain_grid(antenna_type, positions_x, positions_z, center_skip_radius, output) {
    const ptr0 = passStringToWasm0(antenna_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF64ToWasm0(positions_x, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayF64ToWasm0(positions_z, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    var ptr3 = passArrayF64ToWasm0(output, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    wasm.calculate_pattern_gain_grid(ptr0, len0, ptr1, len1, ptr2, len2, center_skip_radius, ptr3, len3, output);
}

/**
 * Calculate complete radiation pattern (360 degrees)
 *
 * # Arguments
 * * `antenna_type` - Type of antenna
 * * `num_points` - Number of points to calculate
 * * `elevation_angle` - Elevation angle in radians (0 = horizon, PI/2 = zenith)
 * * `output` - Output buffer for gain values
 * @param {string} antenna_type
 * @param {number} num_points
 * @param {number} elevation_angle
 * @param {Float64Array} output
 */
export function calculate_pattern_radiation(antenna_type, num_points, elevation_angle, output) {
    const ptr0 = passStringToWasm0(antenna_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArrayF64ToWasm0(output, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.calculate_pattern_radiation(ptr0, len0, num_points, elevation_angle, ptr1, len1, output);
}

/**
 * 计算传播路径的统计信息
 * @param {PropagationParams} params
 * @returns {PropagationStats}
 */
export function calculate_propagation_stats(params) {
    _assertClass(params, PropagationParams);
    const ret = wasm.calculate_propagation_stats(params.__wbg_ptr);
    return PropagationStats.__wrap(ret);
}

/**
 * 计算信号路径
 *
 * 根据传播参数计算射线路径点
 *
 * # Arguments
 * * `params` - 传播参数
 * * `path_buffer` - 路径点缓冲区 [x, y, z, x, y, z, ...]
 * * `impact_buffer` - 撞击点标记缓冲区 (0=普通点, 1=撞击点)
 *
 * # Returns
 * 返回实际路径点数，如果缓冲区不足返回 -1
 * @param {PropagationParams} params
 * @param {Float32Array} path_buffer
 * @param {Uint8Array} impact_buffer
 * @returns {number}
 */
export function calculate_signal_path(params, path_buffer, impact_buffer) {
    _assertClass(params, PropagationParams);
    var ptr0 = passArrayF32ToWasm0(path_buffer, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(impact_buffer, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.calculate_signal_path(params.__wbg_ptr, ptr0, len0, path_buffer, ptr1, len1, impact_buffer);
    return ret;
}

/**
 * Calculate Yagi element lengths only (simplified API)
 *
 * # Arguments
 * * `frequency` - Frequency in MHz
 * * `element_count` - Number of elements
 * * `element_diameter` - Element diameter in mm
 * * `boom_diameter` - Boom diameter in mm
 * * `mount_method` - Mount method string
 *
 * # Returns
 * JSON array of element lengths in mm
 * @param {number} frequency
 * @param {number} element_count
 * @param {number} element_diameter
 * @param {number} boom_diameter
 * @param {string} mount_method
 * @returns {string}
 */
export function calculate_yagi_element_lengths(frequency, element_count, element_diameter, boom_diameter, mount_method) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(mount_method, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.calculate_yagi_element_lengths(frequency, element_count, element_diameter, boom_diameter, ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Calculate Yagi-Uda antenna dimensions based on DL6WU and VK5DJ models.
 *
 * # Arguments
 * * `config_json` - JSON string containing YagiConfig
 *
 * # Returns
 * JSON string containing YagiDesign
 * @param {string} config_json
 * @returns {string}
 */
export function calculate_yagi_json(config_json) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.calculate_yagi_json(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * Estimate Moxon antenna gain
 *
 * Moxon rectangles typically have ~5.5-6 dBi gain depending on construction
 * @returns {number}
 */
export function estimate_moxon_gain() {
    const ret = wasm.estimate_moxon_gain();
    return ret;
}

/**
 * Calculate a rough gain estimate based on element count.
 *
 * `material` is retained for API compatibility and describes the boom, not the elements.
 * @param {number} element_count
 * @param {string} _material
 * @returns {number}
 */
export function estimate_yagi_gain(element_count, _material) {
    const ptr0 = passStringToWasm0(_material, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.estimate_yagi_gain(element_count, ptr0, len0);
    return ret;
}

/**
 * 生成球面几何体数据
 *
 * 用于创建地波、电离层等球面效果
 *
 * # Arguments
 * * `params` - 球面参数
 * * `vertices` - 顶点缓冲区输出 [x, y, z, x, y, z, ...]
 * * `uvs` - UV 缓冲区输出 [u, v, u, v, ...]
 * * `indices` - 索引缓冲区输出 [i0, i1, i2, i0, i1, i2, ...]
 *
 * # Returns
 * 返回 (顶点数, 索引数)
 * @param {SphericalSurfaceParams} params
 * @param {Float32Array} vertices
 * @param {Float32Array} uvs
 * @param {Uint32Array} indices
 * @returns {number}
 */
export function generate_spherical_surface(params, vertices, uvs, indices) {
    _assertClass(params, SphericalSurfaceParams);
    var ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArrayF32ToWasm0(uvs, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    const ret = wasm.generate_spherical_surface(params.__wbg_ptr, ptr0, len0, vertices, ptr1, len1, uvs, ptr2, len2, indices);
    return ret;
}

/**
 * Get antenna characteristics
 *
 * # Arguments
 * * `antenna_type` - Type of antenna
 * * `gain_output` - Output for estimated max gain (dBi)
 * * `beamwidth_output` - Output for beamwidth in degrees
 * @param {string} antenna_type
 * @param {Float64Array} gain_output
 * @param {Float64Array} beamwidth_output
 */
export function get_pattern_antenna_info(antenna_type, gain_output, beamwidth_output) {
    const ptr0 = passStringToWasm0(antenna_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = passArrayF64ToWasm0(gain_output, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArrayF64ToWasm0(beamwidth_output, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    wasm.get_pattern_antenna_info(ptr0, len0, ptr1, len1, gain_output, ptr2, len2, beamwidth_output);
}

/**
 * 获取传播计算所需的缓冲区大小建议
 * @param {number} max_hops
 * @returns {number}
 */
export function get_propagation_buffer_size(max_hops) {
    const ret = wasm.get_propagation_buffer_size(max_hops);
    return ret;
}

/**
 * 计算所需缓冲区大小
 * @param {number} segments_r
 * @param {number} segments_w
 * @returns {bigint}
 */
export function get_spherical_surface_buffer_sizes(segments_r, segments_w) {
    const ret = wasm.get_spherical_surface_buffer_sizes(segments_r, segments_w);
    return ret;
}

/**
 * 批量射线与球体相交测试 (WASM 导出)
 *
 * # Arguments
 * * `ray_origins` - 射线起点 [x, y, z, x, y, z, ...]
 * * `ray_dirs` - 射线方向 [x, y, z, x, y, z, ...]
 * * `sphere_center` - 球心 [x, y, z]
 * * `sphere_radius` - 球半径
 * * `results` - 输出结果 [t1, t2, t1, t2, ...]，无交点时 t1=t2=-1
 * @param {Float32Array} ray_origins
 * @param {Float32Array} ray_dirs
 * @param {Float32Array} sphere_center
 * @param {number} sphere_radius
 * @param {Float32Array} results
 */
export function intersect_sphere_batch(ray_origins, ray_dirs, sphere_center, sphere_radius, results) {
    const ptr0 = passArrayF32ToWasm0(ray_origins, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF32ToWasm0(ray_dirs, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayF32ToWasm0(sphere_center, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    var ptr3 = passArrayF32ToWasm0(results, wasm.__wbindgen_malloc);
    var len3 = WASM_VECTOR_LEN;
    wasm.intersect_sphere_batch(ptr0, len0, ptr1, len1, ptr2, len2, sphere_radius, ptr3, len3, results);
}

/**
 * List all supported antenna types as a comma-separated string
 * @returns {string}
 */
export function list_pattern_antenna_types() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.list_pattern_antenna_types();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_copy_to_typed_array_fc0809a4dec43528: function(arg0, arg1, arg2) {
            new Uint8Array(arg2.buffer, arg2.byteOffset, arg2.byteLength).set(getArrayU8FromWasm0(arg0, arg1));
        },
        __wbg___wbindgen_throw_be289d5034ed271b: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./antenna_bg.js": import0,
    };
}

const PathPointFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pathpoint_free(ptr >>> 0, 1));
const PropagationParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_propagationparams_free(ptr >>> 0, 1));
const PropagationStatsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_propagationstats_free(ptr >>> 0, 1));
const SphericalSurfaceParamsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sphericalsurfaceparams_free(ptr >>> 0, 1));

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('antenna_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
