export default {
  subtitle: "Antenna Theory Visualization",
  loading: "Loading 3D scene...",
  aboutTitle: "About This Demo",
  polarizationMatch: "Polarization Match & Loss",
  polarizationTitle: "Polarization Characteristics & Applications",
  physicsValidation: "Physics Validation",

  circularPolarization: {
    metaTitle: "Circular Polarization | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of circular polarization wave propagation, including RHCP and LHCP.",
    metaKeywords:
      "circular polarization, RHCP, LHCP, helical antenna, satellite communication",
    title: "Circular Polarization",
    about:
      "This visualization demonstrates <b>Circular Polarization</b> electromagnetic wave propagation. In this polarization mode, the electric field vector rotates as the wave propagates, tracing a helical shape.",
    rhcp: "<strong>Right-Hand Circular Polarization (RHCP):</strong> The electric field vector rotates clockwise along the propagation direction (following the right-hand rule).",
    lhcp: "<strong>Left-Hand Circular Polarization (LHCP):</strong> The electric field vector rotates counterclockwise along the propagation direction.",
    application:
      "<strong>Application:</strong> Circular polarization is widely used in <b>satellite communications</b> because it resists Faraday rotation (polarization plane change when signals pass through the ionosphere) and doesn't require precise alignment between transmitting and receiving antennas.",
    matchRhcpToRhcp: "<strong>RHCP Transmit -> RHCP Receive:</strong>",
    matchRhcpToLhcp:
      "<strong>RHCP Transmit -> LHCP Receive (Cross-polarization):</strong>",
    matchCircularToLinear:
      "<strong>Circular Transmit -> Linear Receive (V/H):</strong>",
    bestMatch: "Best Match",
    highLoss: "High Loss",
    loss3db: "3dB Loss",
    rhcpToLhcpNote: "Theoretically infinite loss, typically >20dB in practice.",
    reflectionNote:
      "Note: When circularly polarized signals reflect off a surface, their rotation direction usually reverses (e.g., RHCP becomes LHCP).",
    circularToLinearNote:
      "This is a common strategy for satellite work (if you don't want to build complex tracking circular polarization antennas), but you lose half the signal.",
    physicsContent:
      "For helical antennas, when the helix circumference approaches one wavelength, the antenna operates in <strong>Axial Mode</strong>. The antenna radiates strongly along the helix axis, forming a directional beam with nearly perfect circular polarization.",
    physicsQuote:
      '"The axial mode of radiation... maximum radiation is along the helix axis... The polarization is circularly polarized."',
  },

  ellipticalPolarization: {
    metaTitle: "Elliptical Polarization | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of the general form of polarization - elliptical polarization, between linear and circular.",
    metaKeywords: "elliptical polarization, polarization, radio propagation",
    title: "Elliptical Polarization",
    about:
      "This visualization demonstrates <b>Elliptical Polarization</b>. This is the general form of polarization. When vertical and horizontal components have different amplitudes, or the phase difference is not 0°, 90°, or 180°, elliptical polarization results.",
    sliderNote:
      "Adjust the sliders below to observe how different parameters affect the polarization shape:",
    linear:
      "<strong>Linear Polarization:</strong> Phase difference is 0° or 180°.",
    circular:
      "<strong>Circular Polarization:</strong> Equal V/H amplitudes with 90° phase difference.",
    elliptical: "<strong>Elliptical Polarization:</strong> All other cases.",
    generalRulesTitle: "General Rules for Polarization Matching",
    generalRules:
      "In practice, most radio signals become somewhat elliptically polarized during propagation (due to reflections, refraction, etc.). Polarization mismatch loss depends on the <strong>Axial Ratio</strong> and <strong>Tilt Angle</strong> differences between the two elliptically polarized waves.",
    physicsContent:
      "Elliptical polarization is the general form of electromagnetic wave polarization; linear and circular are special cases. Mathematically, it's the superposition of two orthogonal linearly polarized components with arbitrary amplitude ratio and phase difference. <strong>Axial Ratio (AR)</strong> measures the ellipse flatness: AR=1 (0dB) is circular, AR=∞ is linear.",
    physicsQuote:
      '"In the general case, the trace of the tip of the electric field vector... forms an ellipse... The ratio of the major axis to the minor axis is called the Axial Ratio."',
  },

  verticalPolarization: {
    metaTitle: "Vertical Polarization | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of vertical polarization dipole antenna electric field propagation and polarization matching principles.",
    metaKeywords:
      "vertical polarization, dipole, vertical antenna, polarization loss",
    title: "Vertical Polarization",
    about:
      "This visualization demonstrates electromagnetic wave propagation from a vertically polarized dipole antenna. Observe how the E-field vector oscillates up and down (vertically) as the wave propagates outward.",
    polarization:
      "<strong>Polarization:</strong> Defined by the direction of the E-field vector.",
    verticalDipole:
      "<strong>Vertical Dipole:</strong> Produces vertically polarized waves.",
    propagation:
      "<strong>Propagation:</strong> Omnidirectional in the horizontal (azimuth) plane.",
    vToV: "<strong>Vertical TX -> Vertical RX:</strong>",
    vToVNote: "Maximum signal strength, no polarization loss.",
    vToH: "<strong>Vertical TX -> Horizontal RX:</strong>",
    crossPolarization: "Cross-polarization Isolation",
    vToHNote:
      "Theoretically no signal received (infinite loss). In practice, typically <strong>-20dB to -30dB</strong> loss due to reflections and multipath.",
    crossPolNote:
      "This is why these two polarizations can share the same frequency without significant interference.",
    vToC: "<strong>Vertical TX -> Circular RX:</strong>",
    vToCNote:
      "A linear wave can be decomposed into two counter-rotating circular waves; the receiving antenna only captures one component, losing half the power (3dB). Despite the loss, this combination is acceptable in certain scenarios (e.g., mobile communications).",
    physicsContent:
      'According to antenna theory, a vertical dipole produces an E-field with only a vertical component. Its radiation intensity is uniform in the horizontal plane, forming an omnidirectional pattern. This means the "E-field vector" (vertical) is geometrically orthogonal to the "main radiation lobe direction" (horizontal plane).',
    physicsQuote:
      '"The radiation pattern of a vertical dipole is omnidirectional in the horizontal plane... The E-field lines are vertical, parallel to the dipole axis."',
  },

  horizontalPolarization: {
    metaTitle: "Horizontal Polarization | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of horizontal polarization dipole antenna electric field propagation and polarization matching principles.",
    metaKeywords:
      "horizontal polarization, dipole, horizontal antenna, polarization loss",
    title: "Horizontal Polarization",
    about:
      "This visualization demonstrates electromagnetic wave propagation from a horizontally polarized dipole antenna. Observe how the E-field vector oscillates left and right (horizontally) as the wave propagates.",
    polarization:
      "<strong>Polarization:</strong> Defined by the direction of the E-field vector.",
    horizontalDipole:
      "<strong>Horizontal Dipole:</strong> Produces horizontally polarized waves.",
    propagation:
      "<strong>Propagation:</strong> Strongest perpendicular to the wire, but we typically focus on its horizontal characteristics relative to ground.",
    hToH: "<strong>Horizontal TX -> Horizontal RX:</strong>",
    hToHNote: "Maximum signal strength.",
    hToV: "<strong>Horizontal TX -> Vertical RX:</strong>",
    hToVNote:
      "Huge signal loss (about <strong>-20dB to -30dB</strong>). In HF DX, ionospheric reflection often changes polarization, so this effect is less severe than in VHF/UHF line-of-sight, where it's critical.",
    physicsContent:
      "A horizontal dipole antenna produces an E-field vector parallel to the ground. Its radiation pattern in free space is a doughnut around the wire, but ground reflection typically creates upward-tilted lobes. Horizontal polarization is popular for HF DX because it's less susceptible to ground noise than vertical polarization.",
    physicsQuote:
      '"Horizontally polarized antennas are less susceptible to man-made noise... The ground reflection factor reinforces the signal at certain takeoff angles."',
  },

  gpAntenna: {
    metaTitle: "Ground Plane Antenna | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of GP antenna vertical monopole structure, radial function, and radiation pattern.",
    metaKeywords:
      "GP antenna, Ground Plane antenna, vertical monopole, radials, quarter wavelength",
    title: "Ground Plane Antenna",
    about:
      "The GP antenna (Ground Plane) is the most basic and common vertical antenna. It consists of a vertical quarter-wavelength radiator and several (typically 3-4) horizontal or downward-sloping radials.",
    artificialGround:
      '<strong>Artificial Ground:</strong> The radial rods create a "mirror" that reflects an image of the antenna, forming an equivalent dipole.',
    takeoffAngle:
      "<strong>Takeoff Angle:</strong> Has a low radiation angle, meaning most energy is radiated horizontally, excellent for DX and local coverage.",
    physicsContent:
      "The GP antenna principle is based on <strong>Image Theory</strong>. The conductive ground plane (radials) acts as a reflector, making the monopole radiation equivalent to a complete dipole. A λ/4 monopole over perfect ground has 3dB more gain than a free-space dipole (energy concentrated in upper hemisphere), with ~37Ω input impedance (half of a dipole).",
    physicsQuote:
      '"A monopole above a perfect ground plane... radiates only in the upper half-space... It is equivalent to a dipole in free space."',
  },

  invertedVAntenna: {
    metaTitle: "Inverted V Antenna | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of Inverted-V antenna structure and radiation characteristics, explaining impedance and installation advantages.",
    metaKeywords:
      "Inverted V antenna, dipole, impedance matching, portable antenna",
    title: "Inverted V Antenna",
    about:
      "The Inverted V is essentially a dipole with the center raised and ends drooping. Its simple installation (needing only one support pole) makes it one of the most popular HF antennas among ham operators.",
    impedance:
      "<strong>Impedance Matching:</strong> The drooping arms lower the radiation impedance from a horizontal dipole's 73Ω to about 50Ω, directly matching common 50Ω coaxial cable.",
    space:
      "<strong>Space Efficiency:</strong> Compared to a horizontal dipole, the Inverted V has a smaller horizontal footprint.",
    mixedPolarization:
      "<strong>Mixed Polarization:</strong> While primarily horizontally polarized (broadside), the drooping arms add vertical components, making it more omnidirectional than a pure horizontal dipole.",
    application:
      "<strong>Application:</strong> Ideal as a beginner's first HF antenna, used for 40m, 20m bands and more.",
    physicsContent:
      "The drooping arms of an Inverted-V affect its radiation impedance and pattern. As the included angle decreases below 180°, input impedance drops (typically to ~50Ω), matching coaxial cable directly. The vertical radiation component increases, filling the nulls of a horizontal dipole for a more uniform pattern.",
    physicsQuote:
      '"Dropping the ends of the dipole to form an Inverted-V lowers the resonant frequency and the feed-point impedance... somewhat more omnidirectional than a horizontal dipole."',
  },

  moxonAntenna: {
    metaTitle: "Moxon Antenna | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of Moxon Rectangle compact structure, showing high front-to-back ratio and excellent directivity.",
    metaKeywords: "Moxon antenna, rectangular antenna, high F/B ratio",
    title: "Moxon Antenna",
    about:
      "The Moxon Rectangle was popularized by Les Moxon (G6XN). It's a two-element wire antenna with element tips bent inward to form a rectangle.",
    fbRatio:
      "<strong>Excellent F/B Ratio:</strong> The Moxon's main feature is its extremely high front-to-back ratio, effectively suppressing interference from behind.",
    compact:
      "<strong>Compact Size:</strong> Its span is about 70% of a full-size Yagi for the same frequency, ideal for space-limited locations.",
    bandwidth:
      "<strong>Wide Bandwidth:</strong> Maintains good SWR over a wide frequency range.",
    applicationTitle: "Applications",
    foxHunting:
      "<strong>Direction Finding:</strong> Excellent directivity and F/B ratio make it popular for fox hunting.",
    limitedSpace:
      "<strong>Limited Space DX:</strong> When balcony or rooftop space is insufficient for a Yagi, the Moxon is an excellent alternative.",
    physicsContent:
      'The Moxon Rectangle uses "critical coupling" principles. By bending element tips inward with specific spacing, the mutual coupling between driven element and reflector is enhanced. This geometry produces a nearly perfect cardioid pattern, maintaining forward gain while greatly eliminating back radiation (high F/B ratio).',
    physicsQuote:
      '"The Moxon Rectangle is a 2-element beam with the element tips folded towards each other... maximizing the front-to-back ratio."',
  },

  positiveVAntenna: {
    metaTitle: "Positive V Antenna | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of Positive V antenna structure, showing why it's ideal for rooftop installation in limited space.",
    metaKeywords:
      "Positive V antenna, dipole, rooftop antenna, compact antenna",
    title: "Positive V Antenna",
    about:
      'The Positive V is a dipole with arms angled upward, shaped like a "V". This is opposite to the Inverted V, which has its center high and ends low.',
    structure:
      "<strong>Structural Advantage:</strong> With ends raised, the high-voltage points (antenna tips) are far from ground and nearby objects, reducing dielectric losses and improving safety.",
    rotatable:
      "<strong>Rotatable Dipole:</strong> On HF bands, the Positive V is often used for rotatable dipoles. The V-shape reduces turning radius, making the antenna more compact with lower rotational inertia.",
    polarizationTitle: "Polarization & Pattern",
    physicsContent:
      "The Positive-V raises high-voltage points (antenna tips) away from ground or rooftop structures. This significantly reduces capacitive effects and dielectric losses from nearby objects, maintaining high radiation efficiency. The V-shape slightly modifies the far-field pattern, filling in the figure-8 nulls.",
    physicsQuote:
      '"Raising the ends of the dipole in a V-shape keeps the high-voltage points away from lossy structures... minimizing ground losses."',
  },

  quadAntenna: {
    metaTitle: "Quad Antenna | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of Quad Antenna loop structure, showing high gain and low radiation angle characteristics.",
    metaKeywords: "Quad antenna, directional antenna, DX, high gain",
    title: "Quad Antenna",
    about:
      "The Quad antenna (typically Cubical Quad) consists of two or more square loop elements. Invented by Clarence Moore (W9LZX) in the 1940s to solve high-altitude corona discharge problems.",
    highGain:
      "<strong>High Gain:</strong> A 2-element Quad typically equals the gain of a 3-element Yagi.",
    lowNoise:
      "<strong>Low Noise:</strong> The closed-loop structure helps reduce static noise during reception; it typically sounds quieter than a Yagi.",
    polarizationTitle: "Polarization & Characteristics",
    polarization:
      "<strong>Polarization:</strong> Depends on feed point location.",
    horizontalFeed: "Bottom or top center feed → Horizontal polarization.",
    verticalFeed: "Side center feed → Vertical polarization.",
    challenge:
      "<strong>Challenge:</strong> The 3D structure has large wind loading; wind and ice resistance are main challenges.",
    physicsContent:
      "The Quad antenna is a full-wavelength closed loop with a more effective radiation aperture than a half-wave dipole. A standard 2-element Quad (driven + reflector) provides about 7dBi gain through critical coupling, equivalent to a 3-element Yagi. Being a DC-grounded closed loop, it effectively dissipates precipitation static, resulting in lower background noise than Yagis.",
    physicsQuote:
      '"The closed-loop configuration of the Quad antenna results in a lower Q and wider bandwidth... and is less susceptible to static noise."',
  },

  yagiAntenna: {
    metaTitle: "Yagi-Uda Antenna | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of Yagi antenna operation, showing directors, driven element, and reflector functions and radiation pattern.",
    metaKeywords:
      "Yagi antenna, Yagi-Uda antenna, directional antenna, director, reflector",
    title: "Yagi-Uda Antenna",
    about:
      "The Yagi antenna was invented by Hidetsugu Yagi and Shintaro Uda of Japan. It's a <strong>high-gain, highly directional</strong> antenna widely used for shortwave communication, TV reception, and radar.",
    principle:
      "<strong>Operating Principle:</strong> Through mutual coupling between parasitic elements (reflector and directors) and the driven element, current phases are modified to constructively combine signals in one direction while canceling in the opposite direction.",
    gain: "<strong>Gain:</strong> More elements and longer directors mean higher gain and narrower beam.",
    application:
      "<strong>Application:</strong> The most common DX (long-distance) communication antenna. Focuses your signal toward a specific distant station.",
    polarizationMatch:
      "<strong>Polarization Matching:</strong> Most HF Yagis are mounted horizontally, producing horizontal polarization.",
    polarizationNote:
      "Note: For local VHF/UHF FM communication, vertical mounting is typical to match handheld and mobile radio vertical polarization.",
    physicsContent:
      "Yagi antenna directivity comes from the <strong>phase difference</strong> between induced currents on parasitic elements (reflector and directors) and the driven element current. The reflector is usually slightly longer than resonance (inductive), with lagging current; directors are slightly shorter (capacitive), with leading current. This phase relationship causes constructive interference forward and destructive interference backward.",
    physicsQuote:
      '"The phase of the current in the parasitic element depends on its length... By proper spacing and length, the radiation from the parasitic element reinforces the radiation from the driven element in the forward direction."',
  },

  endFedAntenna: {
    metaTitle: "End-Fed Half Wave Antenna | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of EFHW portability and multi-band resonance characteristics, showing 49:1 impedance transformer principle.",
    metaKeywords:
      "EFHW, End-Fed Half Wave, 49:1 balun, portable antenna, multi-band antenna",
    title: "End-Fed Half Wave Antenna",
    about:
      "The End-Fed Half Wave (EFHW) is a very popular multi-band antenna, especially suitable for field portable operation. It's essentially a wire with length equal to half the working wavelength, fed at one end.",
    impedance:
      "<strong>Impedance Transformation:</strong> Feeding at the half-wavelength end presents extremely high impedance (~2000-4000 ohms), requiring a 49:1 or 64:1 unun to match to 50 ohms.",
    structure:
      "<strong>Structure:</strong> Consists mainly of an unun box, a long radiator wire, and coaxial cable. The coax shield typically serves as counterpoise.",
    multiband:
      "<strong>Multi-band:</strong> Naturally resonates at harmonic frequencies, working on multiple bands (e.g., 40m, 20m, 15m, 10m) without a tuner.",
    polarizationTitle: "Polarization & Applications",
    physicsContent:
      "At resonance, the EFHW feed point is at a voltage antinode (maximum voltage) and current node (minimum current). From Z=V/I, this means extremely high input impedance (theoretically infinite, practically ~2500-5000Ω). A high-ratio broadband unun (49:1 or 64:1) is required to transform this to 50Ω.",
    physicsQuote:
      '"An end-fed half-wave antenna presents a very high impedance at the feed point... requiring a matching network (unun) to transform the high impedance down to 50 ohms."',
  },
} satisfies typeof import("~/locales/zh/demos").default;
