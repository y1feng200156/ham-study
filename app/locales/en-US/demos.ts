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
      "This visualization demonstrates <b>Elliptical Polarization</b>. This is the general form of polarization. When vertical and horizontal components have different amplitudes, or the phase difference is not <M>0^\\circ</M>, <M>90^\\circ</M>, or <M>180^\\circ</M>, elliptical polarization results.",
    sliderNote:
      "Adjust the sliders below to observe how different parameters affect the polarization shape:",
    linear:
      "<strong>Linear Polarization:</strong> Phase difference is <M>0^\\circ</M> or <M>180^\\circ</M>.",
    circular:
      "<strong>Circular Polarization:</strong> Equal V/H amplitudes with <M>90^\\circ</M> phase difference.",
    elliptical: "<strong>Elliptical Polarization:</strong> All other cases.",
    generalRulesTitle: "General Rules for Polarization Matching",
    generalRules:
      "In practice, most radio signals become somewhat elliptically polarized during propagation (due to reflections, refraction, etc.). Polarization mismatch loss depends on the <strong>Axial Ratio</strong> and <strong>Tilt Angle</strong> differences between the two elliptically polarized waves.",
    physicsContent:
      "Elliptical polarization is the general form of electromagnetic wave polarization; linear and circular are special cases. Mathematically, it's the superposition of two orthogonal linearly polarized components with arbitrary amplitude ratio and phase difference. <strong>Axial Ratio (AR)</strong> measures the ellipse flatness: <M>AR=1 (0\\text{dB})</M> is circular, <M>AR=\\infty</M> is linear.",
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

  dipoleAntenna: {
    metaTitle: "Dipole Antenna | Ham Radio Visualization",
    metaDescription:
      "3D visualization of Dipole Antenna structure, standing wave principle, and radiation pattern.",
    metaKeywords:
      "dipole antenna, half-wave, standing wave, radiation pattern, inverted v",
    title: "Dipole Antenna",
    overviewTitle: "About this Demo",
    overview:
      "This page provides an interactive 3D simulation of a <strong>Dipole Antenna</strong>. You can adjust the antenna length (0.5λ, 1.0λ, 1.5λ) to observe changes in standing wave distribution, or toggle 'Inverted V' mode to see how deformation affects radiation.",
    structure:
      "<strong>Structure Simulation</strong>: The red and blue cylinders represent the dipole arms, with a white feedpoint in the center. The yellow line dynamically visualizes the current standing wave.",
    halfWave:
      "<strong>Try This</strong>: Set the length to standard <strong>0.5λ</strong> to see the classic half-wave dipole characteristics. Then switch to <strong>1.5λ</strong> to observe pattern splitting.",
    principleTitle: "Working Principle: Standing Wave",
    principle:
      "The yellow curve in the simulation shows the current standing wave distribution. Observe the position of current antinodes (max) and nodes (zero).",
    principleDetails: {
      ends: "<strong>Ends:</strong> Always Current Nodes (0), satisfying physical boundary conditions.",
      center:
        "<strong>Feedpoint:</strong> Current Antinode (Max) at half-wave, corresponding to low impedance (73Ω); Node (0) at full-wave, meaning high impedance.",
      impedance:
        "<strong>Impedance Hint:</strong> By observing the current magnitude at the feedpoint, you can intuitively infer impedance (High current = Low Z, Low current = High Z).",
    },
    patternTitle: "Radiation Pattern Formula (Mathematical Model)",
    patternIntro:
      "The green 3D mesh visualizes the far-field radiation intensity <M>F(\\theta)</M> calculated by the formula below. Notice how it 'breathes' as you change length <M>L</M>.",
    halfWaveSpecialCase:
      "Special case for Half-wave Dipole (<M>L=\\lambda/2 \\Rightarrow kL/2 = \\pi/2</M>)",
    fullWaveTitle: "Why not Full-wave Dipole?",
    fullWaveIntro:
      "If you set the length to <M>1.0\\lambda</M> in the simulator:",
    fullWavePoints: {
      pattern:
        "<strong>Pattern:</strong> Narrower but still figure-8, slightly higher gain.",
      impedance:
        "<strong>Impedance Disaster:</strong> At the center, current is 0 (Node). This implies input impedance <strong>Z approaches infinity</strong> (thousands of ohms).",
      conclusion:
        "<strong>Conclusion:</strong> A 50Ω radio cannot directly drive a full-wave dipole. It requires end-feeding (EFHW) or special matching.",
    },
    impedanceTitle: "Impedance Characteristics",
    impedance73: "<strong>73Ω:</strong> Half-wave dipole in free space.",
    impedance50:
      "<strong>50Ω:</strong> When made into an 'Inverted V' (angle 90-120°), impedance drops to ~50Ω, allowing direct coax connection without a balun transformer (1:1 balun still recommended for balance).",
    physicsContent:
      "The current distribution on a thin dipole antenna is approximately sinusoidal with nulls at the ends. This standing wave distribution generates the electromagnetic field radiation.",
    physicsQuote:
      '"The current distribution on the antenna... is assumed to be sinusoidal... This approximation is quite accurate for thin dipoles."',
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
    theoryAnalysis: "Theoretical Analysis",
    theoryContent:
      "The GP Antenna (Ground Plane) relies on <strong>Image Theory</strong>. The ground plane (radials) acts as an electromagnetic mirror, creating a virtual image of the radiator underground to form a complete vertical dipole. The combination of the physical 1/4 wave radiator and the virtual image achieves full-size antenna efficiency. Bending the radials down to ~135° raises the feed-point impedance to <strong>50Ω</strong> for a perfect match with coaxial cable. Its low take-off angle makes it a formidable tool for DX communication.",
    formulaRadiation: "Radiation Pattern (Ideal Monopole)",
    formulaImpedance: "Impedance Matching (Radials at 135°)",
    comparisonTable: {
      title: "Comparison: GP (Vertical) vs Dipole (Horizontal)",
      headers: ["Feature", "GP Antenna (Vertical)", "Dipole (Horizontal)"],
      rows: [
        {
          feature: "Directionality",
          gp: "Omni (360°)",
          dipole: "Bi-directional (Figure-8)",
        },
        {
          feature: "Take-off Angle",
          gp: "Low (Good for DX)",
          dipole: "High (Good for NVIS)",
        },
        {
          feature: "Noise Level",
          gp: "High (Prone to noise)",
          dipole: "Low (Quieter)",
        },
        {
          feature: "Installation",
          gp: "Small footprint",
          dipole: "Large span required",
        },
      ],
    },
    physicsContent:
      "The operation of a GP antenna depends on Image Theory. A perfect conductive ground plane acts like an electromagnetic mirror, creating an image below ground with the same current direction (in phase) as the vertical radiator above. This makes a 1/4 wave monopole far-field equivalent to a 1/2 wave dipole. The radials simulate this conductive plane.",
    physicsQuote:
      '"The monopole above a ground plane creates an image current... The combination of the actual source and the image current produces the same fields as a dipole in the upper hemisphere."',
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
    theoryAnalysis: "Theoretical Analysis",
    theoryContent:
      "The Inverted V is the \"Poor Man's Ferrari\". Its core advantages are <strong>extreme simplicity</strong> and <strong>natural impedance matching</strong>. Requiring only a single central mast, the wires slope down naturally. When the apex angle is between 90° and 120°, the feed-point impedance drops from a dipole's 73Ω to approximately <strong>50Ω</strong>, allowing direct connection to coaxial cable without matching units. Additionally, its vertical polarization component enhances omnidirectional radiation, making it excellent for NVIS.",
    formulaImpedance: "Input Impedance (Angle 90°-120°)",
    comparisonTable: {
      title: "Comparison: Rigid V vs Inverted V",
      headers: ["Feature", "Positive V (Rigid)", "Inverted V (Wire)"],
      rows: [
        {
          feature: "Material",
          rigid: "Aluminum Tubing",
          inverted: "Wire",
        },
        {
          feature: "Support",
          rigid: "Rotator + Mount",
          inverted: "Single Mast",
        },
        {
          feature: "Application",
          rigid: "DX (Long Distance)",
          inverted: "NVIS (Regional) / Portable",
        },
        {
          feature: "Cost",
          rigid: "High",
          inverted: "Very Low",
        },
      ],
    },
    physicsContent:
      "Dropping the ends of the dipole to form an Inverted-V affects both its impedance and radiation pattern. As the included angle becomes less than 180°, the input impedance decreases (typically to near 50Ω), providing a better match to coax. Vertically polarized radiation increases, filling in the nulls off the ends of the dipole, making the pattern more omnidirectional.",
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
    theoryAnalysis: "Theoretical Analysis",
    theoryContent:
      "Although the precise radiation field of a Moxon antenna requires complex numerical analysis (like NEC modeling), its signature <strong>Cardioid Pattern</strong> can be approximated by the following simplified function:",
    formulaRadiation: "Radiation Pattern Formula (Mathematical Model)",
    formulaAngle:
      "Where <M>\\theta</M> is the azimuth angle (<M>0^\\circ</M> is the front).",
    formulaShapeFactor:
      "<M>A</M> is the shape factor (typically <M>A \\approx 1.3</M>).",
    theorySummaryTable: {
      title: "Moxon vs 2-Element Yagi",
      headers: ["Feature", "Moxon Rectangle", "2-Element Yagi"],
      rows: [
        {
          feature: "Size",
          moxon: "Small (Compact Rectangle)",
          yagi: "Large (Linear)",
        },
        {
          feature: "F/B Ratio",
          moxon: "<strong>Very High (>20dB)</strong>",
          yagi: "Average (10-15dB)",
        },
        {
          feature: "Gain",
          moxon: "Moderate (~5.5 dBi)",
          yagi: "Slightly Higher (~6.0 dBi)",
        },
        {
          feature: "Matching",
          moxon: "<strong>Direct 50Ω</strong>",
          yagi: "Matching Network Required",
        },
        {
          feature: "Bandwidth",
          moxon: "Very Wide",
          yagi: "Narrower",
        },
      ],
    },
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

    // New Content
    theoryAnalysis: "Theoretical Analysis",
    theoryContent:
      "The Positive-V antenna is essentially a <strong>bent half-wave dipole</strong>. By folding the elements upward into a V-shape (typically 90°~120°), the antenna's impedance characteristics are altered. While a straight dipole has an impedance of about 73Ω, the V-shape utilizes mutual impedance between elements to lower the radiation resistance to near <strong>50Ω</strong>, achieving a <strong>natural match</strong> with common coaxial cables (no tuner needed). Additionally, the V-shape improves directionality by filling in the nulls at the ends of the antenna.",
    impedanceMathLabel: "Impedance at 120° angle",
    comparisonTable: {
      title: "Comparison Table",
      headers: ["Feature", "Positive V (Rigid V)", "Inverted V"],
      rows: [
        {
          feature: "Shape",
          posV: "V (Low center, high ends)",
          invV: "∧ (High center, low ends)",
        },
        {
          feature: "Impedance",
          posV: "~50Ω (Natural match)",
          invV: "< 50Ω (Usually needs Balun)",
        },
        {
          feature: "Take-off Angle",
          posV: "Low (Good for DX)",
          invV: "High (Good for NVIS)",
        },
        {
          feature: "Installation",
          posV: "Rotator/Al tubing (Rigid)",
          invV: "Single mast/Wire (Simple)",
        },
      ],
    },
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
    theoryAnalysis: "Theoretical Analysis",
    theoryContent:
      "The Full-Wave Loop (Quad) is essentially a <strong>folded dual-dipole array</strong>. When the perimeter is approximately 1 wavelength (<M>\\lambda</M>), the current distribution forms a standing wave, with maximum radiation perpendicular to the loop plane (Broadside). This closed-loop structure provides higher gain (approx 3.3 dBi) than a half-wave dipole and is DC-grounded, effectively reducing precipitation static noise for quieter reception.",
    formulaLoopLength: "Loop Perimeter",
    formulaImpedance: "Input Impedance (Single Loop)",
    comparisonTable: {
      title: "Comparison Table",
      headers: ["Feature", "Small Loop", "Full-Wave Loop"],
      rows: [
        {
          feature: "Size (Perimeter)",
          small: "< 0.1λ",
          full: "≈ 1.0λ",
        },
        {
          feature: "Physics Model",
          small: "Magnetic Dipole",
          full: "Dual Dipole Array",
        },
        {
          feature: "Radiation Direction",
          small: "In Plane",
          full: "Broadside",
        },
        {
          feature: "Application",
          small: "Reception (AM Rod)",
          full: "Transmission/DX (Quad)",
        },
      ],
    },
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
    theoryAnalysis: "Theoretical Analysis",
    principle:
      "<strong>Operating Principle:</strong> Through mutual coupling between parasitic elements (reflector and directors) and the driven element, current phases are modified to constructively combine signals in one direction while canceling in the opposite direction.",
    gain: "<strong>Gain:</strong> More elements and longer directors mean higher gain and narrower beam.",
    application:
      "<strong>Application:</strong> The most common DX (long-distance) communication antenna. Focuses your signal toward a specific distant station.",
    polarizationTitle: "Polarization Matching",
    polarizationMatch:
      "<strong>Polarization Matching:</strong> Most HF Yagis are mounted horizontally, producing horizontal polarization.",
    polarizationNote:
      "Note: For local VHF/UHF FM communication, vertical mounting is typical to match handheld and mobile radio vertical polarization.",
    physicsContent:
      "Yagi antenna directivity comes from the <strong>phase difference</strong> between induced currents on parasitic elements (reflector and directors) and the driven element current. The reflector is usually slightly longer than resonance (inductive), with lagging current; directors are slightly shorter (capacitive), with leading current. This phase relationship causes constructive interference forward and destructive interference backward.",
    physicsQuote:
      '"The phase of the current in the parasitic element depends on its length... By proper spacing and length, the radiation from the parasitic element reinforces the radiation from the driven element in the forward direction."',
    theoryTitle: "1. Overview",
    theoryContent:
      "The Yagi antenna is an <strong>end-fire array</strong>. It works by inducing currents in parasitic elements (Reflectors/Directors) via <strong>mutual coupling</strong>. The <strong>Reflector</strong> is slightly longer than 1/2 wavelength (inductive), causing current lag that cancels the back lobe. The <strong>Directors</strong> are shorter (capacitive), causing current lead that reinforces the forward beam. This precise phase control achieves high gain without a complex feed network.",
    formulaDriven: "Driven Element Length",
    formulaReflector: "Reflector Length (usually 5% longer)",
    formulaDirector: "Director Length (usually 5% shorter)",
    theorySummaryTable: {
      title: "Summary Table",
      headers: ["Element Type", "Length", "Reactance", "Phase", "Function"],
      rows: [
        {
          type: "<strong>Reflector</strong>",
          length: "<M>\\gt \\lambda/2</M>",
          reactance: "Inductive (+jX)",
          phase: "Lag",
          function: 'Eliminate back radiation, acts as "mirror"',
        },
        {
          type: "<strong>Driven Element</strong>",
          length: "<M>\\approx \\lambda/2</M>",
          reactance: "Resonant (0)",
          phase: "Reference",
          function: "Energy feed point",
        },
        {
          type: "<strong>Director</strong>",
          length: "<M>\\lt \\lambda/2</M>",
          reactance: "Capacitive (-jX)",
          phase: "Lead",
          function: 'Guide beam forward, acts as "lens"',
        },
      ],
    },
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
    theoryAnalysis: "Theoretical Analysis",
    theoryVoltageFeed:
      "<strong>Voltage Feed:</strong> Feeding at the end of the wire (high voltage, low current) results in a very high impedance (<M>2000\\Omega \\sim 4000\\Omega</M>). A transformer with a high turns ratio (49:1 or 64:1) is essential for efficient power transfer.",
    harmonics:
      "<strong>Harmonic Resonance:</strong> A half-wave wire for the fundamental frequency (<M>f_0</M>) also resonates at integer multiples (<M>2f_0, 3f_0...</M>). This allows multi-band operation (e.g., 40m/20m/10m) on a single wire without a tuner.",
    formulaRadiation: "Radiation Pattern Formula (Harmonics)",
    oddHarmonics: "For odd harmonics (<M>n=1, 3, 5...</M>):",
    evenHarmonics: "For even harmonics (<M>n=2, 4, 6...</M>):",
    patternDesc:
      "As the harmonic order <M>n</M> increases, the single lobe splits into multiple lobes, and the main beam direction shifts closer to the wire axis.",
    commonMode:
      "<strong>Common Mode Current:</strong> The coax shield often acts as the counterpoise. A common mode choke is highly recommended to prevent RFI.",
  },

  longWireAntenna: {
    metaTitle: "Long Wire Antenna | Ham Radio Visualization",
    metaDescription:
      "3D demonstration of Long Wire Antenna multi-lobed radiation characteristics and how length affects directionality.",
    metaKeywords:
      "Long Wire Antenna, random wire, multi-lobed pattern, standing wave",
    title: "Long Wire Antenna",
    about:
      "A long wire antenna is one that is at least one wavelength long (usually much longer). Unlike a half-wave dipole, its radiation pattern becomes complex as length increases.",
    gain: "<strong>Gain & Directivity:</strong> As the antenna length (in wavelengths) increases, the main lobes align more closely with the wire axis, and gain increases.",
    lobes:
      "<strong>Multi-Lobed:</strong> Long wire antennas produce multiple radiation lobes. The longer the wire, the more lobes appear.",
    ground:
      "<strong>Ground System:</strong> For non-resonant long wires (like Random Wire), a good ground system is essential as it is part of the antenna system.",
    physicsContent:
      "Current distribution on a long wire is typically treated as a standing wave (if open-ended) or traveling wave (if terminated). For an open-ended long wire, the radiation pattern is characteristically multi-lobed.",
    physicsQuote:
      '"As the wire is made longer, the major lobes of radiation align more closely with the wire... creating a directional effect along the wire axis."',
    theoryTitle: "Theoretical Analysis",
    theoryDesc:
      "The Long Wire Antenna, particularly when operating at multiple wavelengths, exhibits a complex radiation pattern governed by the standing wave distribution along the wire.",
    theoryFormulaIntro:
      "For a Standing Wave Long Wire Antenna of length L with an odd number of half-wavelengths (<M>n</M> is odd), the normalized electric field radiation pattern <M>E(\\theta)</M> is given by:",
    theoryFormulaExpl:
      "Where <M>\\theta</M> is the angle with respect to the wire axis. In our simulation, we model a wire of length <M>L = 2.5\\lambda</M>, which corresponds to:",
    theoryResult:
      "Since <M>n=5</M> is an odd number, the term <M>\\cos(\\frac{5\\pi}{2} \\cos \\theta)</M> becomes <M>\\cos(0) = 1</M> when <M>\\theta = 90^\\circ</M>. This explains the presence of a broadside lobe perpendicular to the wire, which is a characteristic feature of odd-harmonic standing wave antennas.",
  },

  windomAntenna: {
    metaTitle: "Windom Antenna (OCFD) | Ham Radio Visualization",
    metaDescription:
      "3D visualization of Windom Antenna (OCFD) off-center feed structure, matching principles, and multi-band operation.",
    metaKeywords:
      "Windom antenna, OCFD, Off-Center Fed Dipole, 4:1 balun, multi-band antenna",
    title: "Windom Antenna (Windom / OCFD)",
    overviewTitle: "About this Demo",
    overview:
      "This page demonstrates the <strong>Windom Antenna</strong>, also known as the <strong>Off-Center Fed Dipole (OCFD)</strong>. By moving the feed point away from the center, we gain multi-band capability without significant efficiency loss. The asymmetrical structure is its key feature.",
    structure:
      "<strong>Structure Simulation</strong>: The feed point (white box) is located at approximately <strong>33%</strong> of the total length. This off-center design fundamentally changes the impedance distribution.",
    principleTitle: "Why 33%? (The Magic Point)",
    principleIntro:
      "If we observe the current standing wave distribution (yellow curve) at different frequencies, we find that the 1/3 point is a magic location:",
    principlePoints: {
      fundamental:
        "<strong>Fundamental (n=1)</strong>: Moderate current, impedance approx 200-300Ω.",
      harmonics2:
        "<strong>2nd Harmonic (n=2)</strong>: The center is a current node (infinite impedance), but at 1/3, the current is still moderate (impedance ~200-300Ω).",
      harmonics4:
        "<strong>4th Harmonic (n=4)</strong>: The 1/3 point maintains moderate current and impedance.",
    },
    principleConclusion:
      "<strong>Conclusion</strong>: With a single feed point, we can achieve similar impedance on even harmonic bands like 40m, 20m, and 10m.",
    matchingTitle: "Matching System: 4:1 Balun",
    matchingIntro:
      "Since the feed point impedance (~200-300Ω) is much higher than 50Ω coaxial cable, we need impedance transformation:",
    matchingConclusion:
      "Therefore, the Windom antenna must be used with a <strong>4:1 Current Balun</strong>. This is different from the 49:1 transformer used in EFHW.",
    patternTitle: "Radiation Pattern",
    patternIntro:
      "The radiation pattern (green mesh) is primarily determined by the <strong>physical total length</strong> of the antenna. At the fundamental frequency, it is similar to a dipole (figure-8). At higher harmonics, it splits into multiple lobes.",
    patternPoints: {
      fundamental:
        "<strong>Fundamental</strong>: Distorted figure-8, similar to a dipole.",
      harmonic:
        "<strong>Harmonics</strong>: Multi-lobed, increased directivity.",
    },
    comparisonTitle: "Windom vs EFHW vs Dipole",
    tableHead: {
      feature: "Feature",
      dipole: "Dipole",
      windom: "Windom (OCFD)",
      efhw: "End-Fed (EFHW)",
    },
    tableRow: {
      feedPos: "Feed Point",
      multiBand: "Multi-band",
      match: "Matching",
      ground: "Grounding",
      cons: "Drawbacks",
    },
    tableCell: {
      dipoleFeed: "Center (50%)",
      windomFeed: "Off-Center (33%)",
      efhwFeed: "End (0%)",
      dipoleBand: "Poor (Fundamental + Odd Harmonics)",
      windomBand: "Good (Fundamental + Even Harmonics)",
      efhwBand: "Excellent (Fundamental + All Harmonics)",
      dipoleMatch: "1:1 Balun (Optional)",
      windomMatch: "4:1 Balun (Required)",
      efhwMatch: "49:1 Transformer (Required)",
      dipoleGround: "Not required",
      windomGround: "Recommended (Anti-common mode)",
      efhwGround: "Required (Counterpoise)",
      dipoleCons: "Single band",
      windomCons: "Gaps in harmonics",
      efhwCons: "High loss in transformer",
    },
    comparisonSummary:
      "<strong>Summary</strong>: The Windom antenna is a compromise between efficiency and convenience. It is generally more efficient than EFHW but requires better common-mode noise suppression.",
    misconceptionTitle: "Common Misconceptions",
    misconceptionIntro:
      "Many beginners mistakenly believe that moving the feed point causes the pattern to 'skew to one side'. This is <strong>incorrect</strong>.",
    misconceptionPhysicsTitle: "Physics Rules",
    misconceptionPhysics:
      "The standing wave shape is determined by the <strong>total wire length</strong> and <strong>frequency</strong>. Current must be zero at the ends regardless of feed point. Thus, the standing wave shape and radiation pattern remain unchanged.",
    misconceptionFeedTitle: "Role of Feed Point",
    misconceptionFeed:
      "Moving the feed point only selects the <strong>impedance</strong>:",
    misconceptionFeedLow: "Feed at Antinode = Low Impedance (Dipole)",
    misconceptionFeedHigh: "Feed at Node = High Impedance (End-Fed)",
    misconceptionFeedMid: "Feed at Mid-slope = Medium Impedance (Windom)",
    misconceptionConclusion: "Feed point determines SWR, not directionality.",
    misconceptionExTitle: "Practical Exception",
    misconceptionEx:
      "If the balun is poor and allows common mode current, the feedline becomes part of the radiator, which <strong>does</strong> distort the pattern.",
    polarizationTitle: "Polarization Characteristics",
    polarizationIntro:
      "Windom Antenna is **Linear Polarization** (usually Horizontal). It is **NOT** Elliptical or Circular polarization.",
    polarizationReason1Title: "1. Physics",
    polarizationReason1:
      "Elliptical polarization requires two orthogonal E-field components with a phase shift (e.g., Helical antenna). A Windom is essentially a single wire. The electric field vector always vibrates parallel to the wire.",
    polarizationReason2Title: "2. Mounting Effects",
    polarizationReason2List: {
      horizontal:
        "<strong>Horizontal Mount</strong>: Produces pure Horizontal Linear polarization.",
      invertedV:
        "<strong>Inverted-V Mount</strong>: Still Linear. However, the slanted elements introduce a vertical component that fills in the axial nulls (Filling Factor δ ≈ 0.2), making the pattern more omnidirectional (peanut-shaped).",
      sloper:
        "<strong>Sloper Mount</strong>: Produces Tilted Linear polarization (vibrates along a diagonal line, not rotating).",
    },
    polarizationExceptionTitle: "3. The Only Exception (Interference)",
    polarizationException:
      "Only severe **Common Mode Current** (poor balun causing feeder radiation) can mix vertical feeder waves with horizontal wire waves, leading to messy polarization. But this is considered **Signal Distortion/RFI**, not a design feature.",
    physicsContent:
      "The Windom antenna exploits the property that impedance is similar at approximately 33% of the length for multiple harmonic frequencies. This allows multi-band operation with a single feed point and a 4:1 balun.",
    physicsQuote:
      '"By moving the feed point to an off-center position... the antenna impedance at the feed point can be made manageable on multiple harmonic bands."',
  },
  magneticLoopAntenna: {
    metaTitle: "Magnetic Loop Antenna | Ham Radio Visualization",
    metaDescription:
      "3D visualization of Magnetic Loop Antenna (Small Loop). Explore its high Q, narrow bandwidth, and deep nulls for noise rejection.",
    metaKeywords:
      "Magnetic Loop, Small Loop, Magnetic Dipole, High Q, Anti-Noise, Loop Antenna",
    title: "Magnetic Loop Antenna",
    overviewTitle: "About this Demo",
    overview:
      "This page demonstrates the <strong>Magnetic Loop Antenna</strong>, also known as the Small Loop Antenna. It is an electrically small antenna (<M>C \\lt \\lambda/10</M>).",
    structure:
      "<strong>Structure:</strong> Typically a vertically mounted single or multi-turn coil, tuned by a variable capacitor in series at the top or bottom. A common feed method uses a smaller coupling loop.",
    features:
      "<strong>Features:</strong> Lower efficiency, but extremely high Q factor and narrow bandwidth. Its most famous feature is its excellent noise rejection capability.",
    physicsModelTitle: "Physics Model: Magnetic Dipole",
    physicsModel:
      "The Small Loop Antenna is physically equivalent to a <strong>Magnetic Dipole</strong>. Since its dimensions are much smaller than the wavelength, the current <M>I</M> on the loop is assumed to be uniform (unlike a dipole antenna).",
    fieldFormulaTitle: "Far-Field Electric Field Formula",
    fieldFormulaDesc:
      "The far-field electric field component <M>E_\\phi</M> in spherical coordinates is:",
    paramEta: "<M>\\eta \\approx 377\\Omega</M> (Wave Impedance)",
    paramK: "<M>k = 2\\pi/\\lambda</M> (Wavenumber)",
    paramI: "<M>I</M> is Loop Current",
    paramA: "<M>A</M> is Loop Area",
    paramTheta:
      "<M>\\theta</M> is the angle relative to the loop axis (Z-axis)",
    patternTitle: "Radiation Pattern",
    patternDesc:
      "The directivity function is <M>F(\\theta) = \\sin\\theta</M>.",
    patternNull:
      "<strong>Nulls:</strong> Radiation is zero along the loop axis (perpendicular to the loop plane).",
    patternMax:
      "<strong>Max:</strong> Radiation is maximum in the plane of the loop (looking at the loop edge-on).",
    advantageTitle: "Deep Null Noise Rejection",
    advantageDesc:
      "The most valuable feature of the Magnetic Loop is its deep nulls. By rotating the antenna to place an interference source in the null (along the axis), noise can be reduced by 20-30dB.",
    physicsContent:
      "The Magnetic Loop Antenna radiates primarily magnetic field components in the near field. In the far field, its electric field component is horizontal (<M>\\phi</M> direction), and its radiation pattern is doughnut-shaped with nulls along the axis.",
    physicsQuote:
      '"The small loop antenna is equivalent to a magnetic dipole... it has a null along its axis and maximum radiation in the plane of the loop."',
  },
  hb9cvAntenna: {
    title: "HB9CV Antenna",
    metaTitle: "HB9CV Antenna 3D Visualization - Phased Array Principle",
    metaDescription:
      "Interactive 3D visualization of HB9CV antenna. Explore its unique phasing principle, cardioid radiation pattern, and high front-to-back ratio.",
    metaKeywords:
      "HB9CV antenna, phased array, directional antenna, ham radio, 3D simulation",
    about:
      "The HB9CV antenna is a classic 2-element phased array designed by Swiss radio amateur Rudolf Baumgartner (HB9CV) in the 1950s. Unlike a Yagi-Uda antenna where only one element is driven, both elements of the HB9CV are active. They are fed with equal amplitude but a specific phase difference, resulting in superior gain and a remarkable front-to-back ratio for such a short boom length.",
    structureTitle: "Structure",
    structureContent: "Two driven elements connected by a phasing line.",
    phaseTitle: "Phasing",
    phaseContent: "Uses 225 degrees phase shift for cardioid pattern.",
    phaseFront: "Space phase + Line phase",
    phaseRear: "Cancellation in rear",
    formulaTitle: "Pattern Formula",
    formulaIntro: "Array factor approximation:",
    afDef: "k=wavenumber, d=spacing, theta=angle",
    paramK: "k = 2pi/lambda",
    paramD: "d ~ lambda/8",
    paramDelta: "delta ~ 225 deg",
    patternTitle: "Radiation Pattern",
    patternContent: "Cardioid pattern with deep null in rear.",
    comparisonTitle: "HB9CV vs Yagi",
    comparisonTable: {
      headers: { feature: "Feature", hb9cv: "HB9CV", yagi: "Yagi (2-el)" },
      rows: {
        gain: { feature: "Gain", hb9cv: "Higher", yagi: "Lower" },
        fbRatio: { feature: "F/B Ratio", hb9cv: "High", yagi: "Moderate" },
        bandwidth: { feature: "Bandwidth", hb9cv: "Wide", yagi: "Narrow" },
        feed: { feature: "Feed", hb9cv: "Phased", yagi: "Simple" },
      },
    },
    physicsContent:
      "The HB9CV demonstrates the principle of a phased array where controlling the phase of each element allows for beamforming without the need for passive parasitic elements.",
    physicsQuote:
      "Phased arrays are the basis for modern radar and beamforming systems.",
  },
  electromagneticPropagation: {
    metaTitle: "Electromagnetic Propagation | Ham Radio Visualization",
    metaDescription:
      "3D visualization of electromagnetic wave propagation in different bands (HF/UV), demonstrating ground wave, sky wave, and ionospheric reflection principles.",
    metaKeywords:
      "electromagnetic propagation, ground wave, sky wave, ionosphere hop, HF, UV",
    title: "Electromagnetic Propagation",
    hudTitle: "RADIO SIMULATION SYSTEM",
    systemStatus: {
      online: "SYSTEM: ONLINE",
      ionosphereStable: "IONOSPHERE: STABLE",
      transmissionActive: "TX STATUS: ACTIVE",
    },
    geoInfo: {
      latitude: "LAT",
      longitude: "LON",
      altitude: "ALT",
    },
    controls: {
      title: "MAIN CONSOLE",
      mode: {
        hf: "HF (Shortwave)",
        uv: "UV (Line of Sight)",
      },
      frequency: "TX FREQUENCY",
      elevation: "TX ELEVATION",
      ionosphereHeight: "IONO HEIGHT",
    },
    metrics: {
      snr: "SNR",
      ber: "BER",
    },
    legend: {
      title: "SIGNAL DIAGNOSTICS",
      groundWave: "Ground Wave (Surface)",
      skyWave: "Sky Wave (Reflection)",
      scatter: "Secondary Scatter",
    },
  },
} satisfies typeof import("~/locales/zh/demos").default;
