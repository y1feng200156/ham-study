/* tslint:disable */
/* eslint-disable */

/**
 * 信号路径点
 */
export class PathPoint {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    is_impact: boolean;
    x: number;
    y: number;
    z: number;
}

/**
 * 传播模式
 */
export enum PropagationMode {
    HF = 0,
    UV = 1,
}

/**
 * 传播计算参数
 */
export class PropagationParams {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    angle: number;
    critical_frequency: number;
    earth_radius: number;
    frequency: number;
    iono_height: number;
    max_hops: number;
    mode: PropagationMode;
}

/**
 * 传播统计信息
 */
export class PropagationStats {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    ground_wave_strength: number;
    incidence_angle: number;
    is_penetrating: boolean;
    muf: number;
}

/**
 * 球面几何体生成参数
 */
export class SphericalSurfaceParams {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
    max_angle: number;
    radius: number;
    segments_r: number;
    segments_w: number;
    spread_angle: number;
}

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
 */
export function calculate_boom_correction_json(element_diameter: number, boom_diameter: number, mount_method: string): string;

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
 */
export function calculate_electric_field(antenna_type: string, polarization_type: string, speed: number, amplitude_scale: number, is_rhcp: boolean, antenna_length: number, radial_angle: string, active_harmonic: number, is_inverted_v: boolean, time: number, ground_height: number, grid_size: number, spacing: number, matrix_buffer: Float32Array, color_buffer: Float32Array): void;

/**
 * 计算地波最大角度 (弧度)
 */
export function calculate_ground_wave_angle(strength: number): number;

/**
 * 计算地波强度
 *
 * 地波强度随频率增加而衰减
 */
export function calculate_ground_wave_strength(frequency: number): number;

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
 */
export function calculate_moxon_factors_json(frequency: number, wire_diameter: number): string;

/**
 * Calculate Moxon Rectangle dimensions using AC6LA / MoxGen algorithm.
 * Based on 3rd order polynomial regression of Nec-2 simulation data.
 *
 * # Arguments
 * * `config_json` - JSON string containing MoxonConfig
 *
 * # Returns
 * JSON string containing MoxonDesign
 */
export function calculate_moxon_json(config_json: string): string;

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
 */
export function calculate_moxon_simple_json(frequency: number, wire_diameter: number): string;

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
 */
export function calculate_pattern_gain(antenna_type: string, dir_x: number, dir_y: number, dir_z: number): number;

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
 */
export function calculate_pattern_gain_grid(antenna_type: string, positions_x: Float64Array, positions_z: Float64Array, center_skip_radius: number, output: Float64Array): void;

/**
 * Calculate complete radiation pattern (360 degrees)
 *
 * # Arguments
 * * `antenna_type` - Type of antenna
 * * `num_points` - Number of points to calculate
 * * `elevation_angle` - Elevation angle in radians (0 = horizon, PI/2 = zenith)
 * * `output` - Output buffer for gain values
 */
export function calculate_pattern_radiation(antenna_type: string, num_points: number, elevation_angle: number, output: Float64Array): void;

/**
 * 计算传播路径的统计信息
 */
export function calculate_propagation_stats(params: PropagationParams): PropagationStats;

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
 */
export function calculate_signal_path(params: PropagationParams, path_buffer: Float32Array, impact_buffer: Uint8Array): number;

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
 */
export function calculate_yagi_element_lengths(frequency: number, element_count: number, element_diameter: number, boom_diameter: number, mount_method: string): string;

/**
 * Calculate Yagi-Uda antenna dimensions based on DL6WU and VK5DJ models.
 *
 * # Arguments
 * * `config_json` - JSON string containing YagiConfig
 *
 * # Returns
 * JSON string containing YagiDesign
 */
export function calculate_yagi_json(config_json: string): string;

/**
 * Estimate Moxon antenna gain
 *
 * Moxon rectangles typically have ~5.5-6 dBi gain depending on construction
 */
export function estimate_moxon_gain(): number;

/**
 * Calculate a rough gain estimate based on element count.
 *
 * `material` is retained for API compatibility and describes the boom, not the elements.
 */
export function estimate_yagi_gain(element_count: number, _material: string): number;

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
 */
export function generate_spherical_surface(params: SphericalSurfaceParams, vertices: Float32Array, uvs: Float32Array, indices: Uint32Array): number;

/**
 * Get antenna characteristics
 *
 * # Arguments
 * * `antenna_type` - Type of antenna
 * * `gain_output` - Output for estimated max gain (dBi)
 * * `beamwidth_output` - Output for beamwidth in degrees
 */
export function get_pattern_antenna_info(antenna_type: string, gain_output: Float64Array, beamwidth_output: Float64Array): void;

/**
 * 获取传播计算所需的缓冲区大小建议
 */
export function get_propagation_buffer_size(max_hops: number): number;

/**
 * 计算所需缓冲区大小
 */
export function get_spherical_surface_buffer_sizes(segments_r: number, segments_w: number): bigint;

/**
 * 批量射线与球体相交测试 (WASM 导出)
 *
 * # Arguments
 * * `ray_origins` - 射线起点 [x, y, z, x, y, z, ...]
 * * `ray_dirs` - 射线方向 [x, y, z, x, y, z, ...]
 * * `sphere_center` - 球心 [x, y, z]
 * * `sphere_radius` - 球半径
 * * `results` - 输出结果 [t1, t2, t1, t2, ...]，无交点时 t1=t2=-1
 */
export function intersect_sphere_batch(ray_origins: Float32Array, ray_dirs: Float32Array, sphere_center: Float32Array, sphere_radius: number, results: Float32Array): void;

/**
 * List all supported antenna types as a comma-separated string
 */
export function list_pattern_antenna_types(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly calculate_boom_correction_json: (a: number, b: number, c: number, d: number) => [number, number];
    readonly calculate_yagi_element_lengths: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
    readonly calculate_yagi_json: (a: number, b: number) => [number, number];
    readonly estimate_yagi_gain: (a: number, b: number, c: number) => number;
    readonly __wbg_get_pathpoint_is_impact: (a: number) => number;
    readonly __wbg_get_pathpoint_x: (a: number) => number;
    readonly __wbg_get_pathpoint_y: (a: number) => number;
    readonly __wbg_get_pathpoint_z: (a: number) => number;
    readonly __wbg_get_propagationparams_critical_frequency: (a: number) => number;
    readonly __wbg_get_propagationparams_earth_radius: (a: number) => number;
    readonly __wbg_get_propagationparams_max_hops: (a: number) => number;
    readonly __wbg_get_propagationparams_mode: (a: number) => number;
    readonly __wbg_pathpoint_free: (a: number, b: number) => void;
    readonly __wbg_propagationparams_free: (a: number, b: number) => void;
    readonly __wbg_propagationstats_free: (a: number, b: number) => void;
    readonly __wbg_set_pathpoint_is_impact: (a: number, b: number) => void;
    readonly __wbg_set_pathpoint_x: (a: number, b: number) => void;
    readonly __wbg_set_pathpoint_y: (a: number, b: number) => void;
    readonly __wbg_set_pathpoint_z: (a: number, b: number) => void;
    readonly __wbg_set_propagationparams_critical_frequency: (a: number, b: number) => void;
    readonly __wbg_set_propagationparams_earth_radius: (a: number, b: number) => void;
    readonly __wbg_set_propagationparams_max_hops: (a: number, b: number) => void;
    readonly __wbg_set_propagationparams_mode: (a: number, b: number) => void;
    readonly calculate_ground_wave_angle: (a: number) => number;
    readonly calculate_ground_wave_strength: (a: number) => number;
    readonly calculate_propagation_stats: (a: number) => number;
    readonly calculate_signal_path: (a: number, b: number, c: number, d: any, e: number, f: number, g: any) => number;
    readonly get_propagation_buffer_size: (a: number) => number;
    readonly propagationparams_new: () => number;
    readonly __wbg_set_propagationstats_is_penetrating: (a: number, b: number) => void;
    readonly __wbg_set_propagationparams_angle: (a: number, b: number) => void;
    readonly __wbg_set_propagationparams_frequency: (a: number, b: number) => void;
    readonly __wbg_set_propagationparams_iono_height: (a: number, b: number) => void;
    readonly __wbg_set_propagationstats_ground_wave_strength: (a: number, b: number) => void;
    readonly __wbg_set_propagationstats_incidence_angle: (a: number, b: number) => void;
    readonly __wbg_set_propagationstats_muf: (a: number, b: number) => void;
    readonly __wbg_get_propagationstats_is_penetrating: (a: number) => number;
    readonly __wbg_get_propagationparams_angle: (a: number) => number;
    readonly __wbg_get_propagationparams_frequency: (a: number) => number;
    readonly __wbg_get_propagationparams_iono_height: (a: number) => number;
    readonly __wbg_get_propagationstats_ground_wave_strength: (a: number) => number;
    readonly __wbg_get_propagationstats_incidence_angle: (a: number) => number;
    readonly __wbg_get_propagationstats_muf: (a: number) => number;
    readonly calculate_moxon_factors_json: (a: number, b: number) => [number, number];
    readonly calculate_moxon_json: (a: number, b: number) => [number, number];
    readonly calculate_moxon_simple_json: (a: number, b: number) => [number, number];
    readonly calculate_pattern_gain: (a: number, b: number, c: number, d: number, e: number) => number;
    readonly calculate_pattern_gain_grid: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: any) => void;
    readonly calculate_pattern_radiation: (a: number, b: number, c: number, d: number, e: number, f: number, g: any) => void;
    readonly estimate_moxon_gain: () => number;
    readonly get_pattern_antenna_info: (a: number, b: number, c: number, d: number, e: any, f: number, g: number, h: any) => void;
    readonly list_pattern_antenna_types: () => [number, number];
    readonly calculate_electric_field: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number, o: number, p: number, q: number, r: number, s: any, t: number, u: number, v: any) => void;
    readonly __wbg_get_sphericalsurfaceparams_max_angle: (a: number) => number;
    readonly __wbg_get_sphericalsurfaceparams_radius: (a: number) => number;
    readonly __wbg_get_sphericalsurfaceparams_segments_r: (a: number) => number;
    readonly __wbg_get_sphericalsurfaceparams_segments_w: (a: number) => number;
    readonly __wbg_get_sphericalsurfaceparams_spread_angle: (a: number) => number;
    readonly __wbg_set_sphericalsurfaceparams_max_angle: (a: number, b: number) => void;
    readonly __wbg_set_sphericalsurfaceparams_radius: (a: number, b: number) => void;
    readonly __wbg_set_sphericalsurfaceparams_segments_r: (a: number, b: number) => void;
    readonly __wbg_set_sphericalsurfaceparams_segments_w: (a: number, b: number) => void;
    readonly __wbg_set_sphericalsurfaceparams_spread_angle: (a: number, b: number) => void;
    readonly __wbg_sphericalsurfaceparams_free: (a: number, b: number) => void;
    readonly generate_spherical_surface: (a: number, b: number, c: number, d: any, e: number, f: number, g: any, h: number, i: number, j: any) => number;
    readonly get_spherical_surface_buffer_sizes: (a: number, b: number) => bigint;
    readonly intersect_sphere_batch: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: any) => void;
    readonly sphericalsurfaceparams_new: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
