export default {
  title: "Ham Radio Visualization",
  description:
    "Welcome to the Ham Radio Visualization Lab. Explore interactive 3D simulations of classic antenna types and electromagnetic wave polarization. Through these demonstrations, you can intuitively understand antenna principles and radio wave propagation characteristics.",

  nav: {
    home: "Home",
    back: "Back",
  },

  actions: {
    viewDemo: "View Demo",
    openTool: "Open Tool",
    github: "GitHub Repository",
  },

  sections: {
    tools: "Tools",
  },

  demoCards: {
    vertical: {
      title: "Vertical Polarization",
      description:
        "Visualize electric field propagation of a vertically polarized antenna.",
      keywords: "vertical polarization, electric field, dipole, antenna theory",
    },
    horizontal: {
      title: "Horizontal Polarization",
      description:
        "Visualize electric field propagation of a horizontally polarized antenna.",
      keywords:
        "horizontal polarization, electric field, dipole, antenna theory",
    },
    circular: {
      title: "Circular Polarization",
      description:
        "Visualize the rotating electric field vector in circular polarization.",
      keywords:
        "circular polarization, rotating vector, satellite communication",
    },
    elliptical: {
      title: "Elliptical Polarization",
      description:
        "The general form of polarization, between linear and circular.",
      keywords: "elliptical polarization, polarization types",
    },
    dipoleAntenna: {
      title: "Dipole Antenna",
      description:
        "The most fundamental antenna type. Visualize standing waves and radiation patterns.",
      keywords: "dipole antenna, half-wave, standing wave",
    },
    yagi: {
      title: "Yagi-Uda Antenna",
      description:
        "A famous directional antenna composed of directors, driven element, and reflector.",
      keywords: "yagi-uda antenna, directional antenna, directors, reflector",
    },
    invertedV: {
      title: "Inverted V Antenna",
      description:
        "An easy-to-install dipole variant, higher in the middle and lower at the ends.",
      keywords: "inverted v antenna, dipole variant, wire antenna",
    },
    gp: {
      title: "Ground Plane Antenna",
      description:
        "A vertical monopole antenna with horizontal or downward-sloping radials.",
      keywords: "ground plane antenna, monopole, radials, vertical antenna",
    },
    positiveV: {
      title: "Positive V Antenna",
      description:
        "A dipole with upward-angled arms, suitable for rooftop installation.",
      keywords: "positive v antenna, dipole, rooftop antenna, V-dipole",
    },
    quad: {
      title: "Quad Antenna",
      description:
        "A directional antenna made of square loops, featuring high gain and low noise.",
      keywords: "quad antenna, loop antenna, high gain, low noise",
    },
    moxon: {
      title: "Moxon Antenna",
      description:
        "A compact rectangular directional antenna with excellent front-to-back ratio.",
      keywords:
        "moxon antenna, rectangular antenna, directional, front-to-back",
    },
    endFed: {
      title: "End-Fed Half Wave",
      description:
        "A multi-band portable antenna using a 49:1 impedance transformer, fed at one end.",
      keywords:
        "end-fed half wave, EFHW, portable antenna, impedance transformer",
    },
    longWireAntenna: {
      title: "Long Wire Antenna",
      description:
        "3D demonstration of Long Wire Antenna multi-lobed radiation characteristics.",
      keywords: "Long Wire Antenna, random wire, multi-lobed pattern",
    },
    windomAntenna: {
      title: "Windom Antenna (OCFD)",
      description:
        "3D demonstration of Windom Antenna (OCFD) structure and multi-band operation.",
      keywords: "Windom antenna, OCFD, Off-Center Fed Dipole",
    },
    hb9cv: {
      title: "HB9CV Antenna",
      description:
        "A 2-element phased array with high gain and F/B ratio, designed by HB9CV.",
      keywords: "HB9CV antenna, phased array, directional antenna, ham radio",
    },
    magneticLoopAntenna: {
      title: "Magnetic Loop Antenna",
      description:
        "Small Loop Antenna (Magnetic Dipole) 3D demo. Visualize its deep nulls and high Q.",
      keywords:
        "magnet loop, small loop, magnetic dipole, antenna visualization",
    },
    electromagneticPropagation: {
      title: "Electromagnetic Propagation",
      description:
        "3D visualization of electromagnetic wave propagation in different bands (HF/UV), demonstrating ground wave, sky wave, and ionospheric reflection principles.",
      keywords:
        "electromagnetic propagation, ground wave, sky wave, ionosphere hop, hf, uv",
    },
  },

  tools: {
    yagiCalculator: {
      title: "Yagi Calculator",
      description:
        "Yagi antenna design tool based on DL6WU long boom model & VK5DJ correction algorithm.",
      keywords: "yagi calculator, antenna design, DL6WU, VK5DJ",
      ui: {
        title: "Yagi Calculator",
        subtitle: "DL6WU Engineering Tool",
        quickMode: "Quick Mode",
        proMode: "Pro Mode",
        blueprintPreview: "Blueprint Preview",
        imgDownload: "Save Diagram + Table",
        downloadError:
          "Failed to get blueprint data, please refresh and try again.",
        downloading: "Downloading...",
        downloadFail: "Image generation failed, please try again later",
        downloadUnknownError:
          "Unknown error during download, see console for details.",
        copySuccess: "Data copied to clipboard!",
        boomCorrectionApplied: "Boom Correction Applied",
        boomCorrectionDetails:
          "Based on B/d={{ratio}} and k={{k}}. All elements extended by",
      },
      specs: {
        title: "Basic Specs",
        frequency: "Center Frequency",
        elements: "Element Count",
      },
      quick: {
        title: "Quick Presets",
        label: "Boom Material Type",
        presets: {
          metal_bonded: "Metal Boom - Bonded (Through & Contact)",
          metal_insulated: "Metal Boom - Insulated (Through & Insulated)",
          pvc: "PVC/PPR Boom - Non-metallic",
        },
        note: "* Default: 4mm Element, 20mm Boom, Folded Dipole, DL6WU Spacing.",
      },
      pro: {
        title: "Engineering Parameters",
        section1: "1. Boom Correction",
        section2: "2. Driven Element",
        section3: "3. Spacing Strategy",
        boomShape: "Boom Shape",
        shapes: {
          round: "Round Tube",
          square: "Square Tube",
        },
        elementDia: "Element Diameter (d)",
        elementDiaTooltip: {
          title: "Diameter Effect (K Factor)",
          content:
            "Cut length is adjusted for each element when diameter changes. Measure and tune after assembly.",
        },
        boomDia: "Boom Diameter (B)",
        boomDiaTooltip: {
          title: "Boom Shorting Effect",
          content:
            "Metal boom acts as inductance, shortening electrical length of elements passing through it.",
        },
        mount: "Mounting",
        mountTooltip: {
          title: "Correction Factor (k)",
          item1: "Non-metal: k ≈ 0",
          item2: "Above Boom: k ≈ 0.05 (Minimal)",
          item3: "Through/Bonded: k = Dynamic (0.6~0.8)",
        },
        mountMethods: {
          bonded: "Bonded (Through metal)",
          insulated: "Insulated (Through metal)",
          above: "Above (Isolated from boom)",
          none: "None (Non-metallic boom)",
        },
        bcFactor: "Correction Factor (BC)",
        bcFactorTooltip: {
          title: "Correction Factor k",
          content:
            "DL6WU curve based on B/d ratio. Physical added length = B × k",
        },
        autoCalcNote:
          "* System calculates k via DL6WU curve. You can override manually.",
        nonMetalBoomNote:
          "A fiberglass boom needs no metal-boom correction; k is fixed at 0.",
        deType: "Type",
        deTypeTooltip: {
          title: "Feed and Matching",
          item1:
            "Choose impedance transformation for a folded dipole after measuring the feedpoint.",
          item2:
            "A straight dipole is not guaranteed to match a 50 Ω feed line.",
        },
        matching: {
          title: "Feed matching guidance",
          folded:
            "A folded dipole usually has higher feedpoint impedance than a comparable split dipole. A 50 Ω coax feed may need impedance transformation and balanced feeding.",
          straight:
            "A split dipole in a Yagi is not guaranteed to match 50 Ω coax. A matching network and common-mode suppression may be needed.",
          measure:
            "This tool does not calculate feedpoint impedance or SWR. Measure the assembled antenna with an antenna analyzer before choosing the matching method.",
        },
        deTypes: {
          folded: "Folded Dipole",
          straight: "Straight Dipole",
        },
        feedGap: "Feed Gap",
        feedGapTooltip: {
          title: "Physical Cut",
          content:
            "This input adjusts only the straight dipole cut length. Design and measure a folded dipole feed separately.",
        },
        algo: "Algorithm",
        algoTooltip: {
          title: "DL6WU Tapering",
          content:
            "Director spacing increases from 0.075λ to 0.30λ for max forward gain with good bandwidth.",
        },
        algos: {
          dl6wu: "DL6WU Tapered (Recommended)",
          uniform: "Uniform Spacing (Custom)",
        },
        fixedSpacing: "Fixed Spacing (λ)",
        material: "Material",
        materialTooltip: {
          title: "Boom Material and Correction",
          content:
            "This describes the boom, not the radiating elements. A fiberglass boom needs no metal-boom correction.",
        },
        materials: {
          aluminum: "Aluminum - Standard",
          copper: "Copper - High Conductivity",
          stainless_steel: "Stainless Steel - High Resistance",
          fiberglass: "Fiberglass - Insulator",
        },
      },
      results: {
        title: "Cut List",
        tolerance:
          "Cut lengths are a starting point; measure and tune after assembly.",
        copy: "Copy Data",
        headers: {
          element: "Element",
          pos: "Pos",
          space: "Space",
          half: "Half",
          cut: "Cut",
          note: "Note",
        },
        notes: {
          folded: "Folded",
          gap: "Gap: {{val}}mm",
          foldedLoop: "Folded Loop",
          gapEn: "Gap: {{val}}mm",
        },
        totalBoom: "Total Boom: {{val}} mm",
        estGain: "Est. Gain",
        estGainTooltip:
          "A rough estimate from element count; radiation pattern, matching, and feed-line losses are not modeled.",
        generatedBy: "Generated by Yagi Calc Pro | {{date}}",
        downloadFileName: "yagi_design_{{freq}}MHz.png",
      },
    },
    moxonCalculator: {
      title: "Moxon Calculator",
      description:
        "Moxon Rectangle antenna designer based on AC6LA / MoxGen algorithm.",
      keywords: "moxon calculator, Moxon, MoxGen, antenna design, AC6LA",
      algorithm: "AC6LA / MoxGen Algorithm",
      specs: {
        title: "Configuration",
        subtitle: "Frequency & Wire",
        freqLabel: "Center Frequency (MHz)",
        diaLabel: "Wire Diameter (mm)",
        typicalFreq: "Typ: 144.100, 435.000, 28.500",
        typicalDia: "Typ: 2mm ~ 6mm",
        introTitle: "What is a Moxon?",
        introDesc:
          "The Moxon Rectangle is a 2-element wire beam improved by Les Moxon (G6XN). It offers excellent Front-to-Back ratio and wide bandwidth in a compact rectangle shape (approx 70% of a full size yagi). It typically provides a direct 50Ω feed impedance.",
      },
      results: {
        title: "Dimensions List",
        copy: "Copy Data",
        copied: "Copied to clipboard!",
        headers: {
          id: "ID",
          desc: "Description",
          len: "Length (mm)",
          wl: "Wavelength (λ)",
        },
        rows: {
          A: "Driven Width",
          B: "Driven Tail",
          C: "Gap",
          D: "Reflector Tail",
          E: "Total Depth",
          wireDriven: "Driven Wire Total",
          wireRef: "Reflector Wire Total",
        },
      },
      blueprint: {
        title: "Blueprint Preview",
        download: "Save Blueprint",
        feed: "Feedpoint",
      },
    },
    cw: {
      title: "CW Trainer",
      description:
        "Morse Code trainer based on Web Audio API, supporting real-time decoding and visualization.",
      keywords: "CW, Morse Code, Trainer, Web Audio API",
      panel: {
        letters: "LETTERS",
        numbers: "NUMBERS",
        symbols: "SYMBOLS",
        rx_log: "RX LOG",
        speed: "SPEED",
        clear: "CLEAR",
        morse_code_reference: "Morse Code Reference",
        ref: "REF",
        training_mode: "TRAINING MODE",
        free_play: "FREE PLAY",
        edit: "EDIT",
        next: "NEXT",
        custom_text: "CUSTOM TEXT",
        custom_text_placeholder: "ENTER TEXT (A-Z 0-9)...",
        cancel: "CANCEL",
        confirm: "CONFIRM",
      },
      circuit_board_visualization: "Morse Code Circuit Board Visualization",
      input_aria_label: "Morse Code Input",
      control: {
        dit: "DIT [J / ←]",
        dah: "DAH [K / →]",
        backspace: "DEL [BS]",
        reset: "RESET [ESC]",
      },
      status: {
        ready: "READY",
      },
      speed: {
        slow: "SLOW",
        med: "MED",
        fast: "FAST",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
      },
      instructions: {
        title: "Instructions",
        operation: {
          title: "How to Operate",
          keyboard: "Keyboard Control",
          keyboard_desc:
            "Use '.' / 'J' / 'Left Arrow' for DIT. Use '-' / 'K' / 'Right Arrow' for DAH. Space for word gap. Backspace to delete.",
          buttons: "On-Screen Buttons",
          buttons_desc:
            "Tap the large buttons at the bottom for DIT and DAH. Use the small buttons for Clear, Delete, and Reset.",
        },
        speed_guide: {
          title: "Speed Settings",
          beginner:
            "Beginner: Slow speed (WPM lower) with longer inter-character spacing. Ideal for first-time learners to distinguish dots and dashes.",
          intermediate:
            "Intermediate: Moderate speed. Reduces the exaggerated spacing. Good for practicing rhythm and standard character formation.",
          advanced:
            "Advanced: Fast speed. Minimal spacing. Simulates real-world high-speed CW operation or contesting conditions.",
        },
        training_desc:
          "Switch to Training Mode to practice with on-screen text. The system validates your input in real-time and calculates your WPM. You can also enter custom text for targeted practice.",
      },
      game: {
        title: "CW Defense",
        subtitle: "Tap morse code to defend the wall",
        ready: "Ready to Play?",
        instructions:
          "Press J for · (dit) and K for − (dah). Type the morse code to eliminate falling characters before they reach the wall!",
        start: "Start Game",
        resume: "Resume",
        paused: "Paused",
        score: "Score",
        highScore: "Best",
        combo: "Combo",
        wall: "Defense Wall",
        yourInput: "Your Input",
        waiting: "Waiting...",
        clear: "Clear",
        dit: "Dit",
        dah: "Dah",
        controls:
          "J = · (dit) | K = − (dah) | BACKSPACE = Delete | ESC = Pause",
        gameOver: "Game Over",
        wallBreached: "The wall has been breached!",
        finalScore: "Final Score",
        maxCombo: "Max Combo",
        newRecord: "New Record!",
        mainMenu: "Menu",
        playAgain: "Play Again",
      },
    },
    cwGame: {
      title: "CW Defense",
      description:
        "Defend the wall with Morse Code! A falling typing game to train your CW reaction speed.",
      keywords: "CW, Morse Code, game, typing game, ham radio",
    },
    cwRxGame: {
      title: "CW RX Trainer",
      description:
        "Morse Code reception trainer with realistic HF background noise.",
      keywords: "CW, RX, reception, Morse Code, ham radio",
      ui: {
        title: "RX TRAINER",
        subtitle: "Morse Code Reception Sim",
        instructions:
          "Listen to the sequence. Type what you hear. Press ENTER to submit.",
        start: "START LISTENING",
        score: "Score",
        highScore: "High Score",
        speed: "Speed (WPM)",
        spacing: "Spacing",
        noise: "Noise",
        qsb: "QSB (Fading)",
        chineseCallsigns: "CN Calls Only",
        qsoMode: "Simulate QSO",
        status: {
          transmitting: "TRANSMITTING...",
          waiting: "WAITING FOR INPUT",
          correct: "CORRECT!",
          miss: "MISS!",
          was: "WAS:",
        },
        input: {
          placeholder: {
            playing: "...",
            waiting: "TYPE HERE",
          },
          hint: "PRESS [SPACE] TO REPEAT • [ENTER] TO SUBMIT",
        },
      },
    },
  },

  footer: {
    feedback: {
      title: "Have ideas or suggestions?",
      subtitle: "Feedback is welcome to help improve this project",
      emailTitle: "Send email to ham@charlesify.com",
      githubTitle: "View on GitHub",
    },
    copyright: "© {{year}} BG8ROM. All rights reserved.",
    credits: "Special Thanks",
    acknowledgements: "Acknowledgements",
    authorKJ7LNW: "NEC2 engine powered by KJ7LNW/nec2c",
  },

  meta: {
    siteName: "Ham Radio Visualization",
    keywords:
      "ham radio, antenna demos, 3D visualization, vertical polarization, horizontal polarization, circular polarization, Yagi antenna, GP antenna, inverted V antenna, positive V antenna, quad antenna, Moxon antenna",
    home: {
      title: "Amateur Radio Visualization",
      description:
        "A collection of amateur radio antenna visualizations: including 3D polarization and radiation demos for classic antennas such as Vertical/Horizontal/Circular Polarization, Yagi, Inverted V, GP, Positive V, Quad, Moxon, End-Fed Half Wave, Long Wire, Windom, HB9CV, Magnetic Loop, etc.",
      keywords:
        "amateur radio, antenna demos, 3D visualization, vertical polarization, horizontal polarization, circular polarization, Yagi antenna, GP antenna, Inverted V antenna, Positive V antenna, Quad antenna, Moxon antenna, End-Fed Half Wave, Long Wire, Windom antenna, HB9CV, Magnetic Loop, ham radio demos, antenna visualization",
    },
  },
} satisfies typeof import("~/locales/zh/common").default;
