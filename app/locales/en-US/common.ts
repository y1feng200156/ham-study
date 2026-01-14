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
  },

  tools: {
    yagiCalculator: {
      title: "Yagi Calculator",
      description:
        "A Yagi antenna design tool based on the DL6WU long boom model & VK5DJ correction algorithm.",
      keywords: "yagi calculator, antenna design, DL6WU, VK5DJ",
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
