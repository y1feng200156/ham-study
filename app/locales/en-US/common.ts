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

  demos: {
    vertical: {
      title: "Vertical Polarization",
      description:
        "Visualize electric field propagation of a vertically polarized antenna.",
    },
    horizontal: {
      title: "Horizontal Polarization",
      description:
        "Visualize electric field propagation of a horizontally polarized antenna.",
    },
    circular: {
      title: "Circular Polarization",
      description:
        "Visualize the rotating electric field vector in circular polarization.",
    },
    elliptical: {
      title: "Elliptical Polarization",
      description:
        "The general form of polarization, between linear and circular.",
    },
    yagi: {
      title: "Yagi-Uda Antenna",
      description:
        "A famous directional antenna composed of directors, driven element, and reflector.",
    },
    invertedV: {
      title: "Inverted V Antenna",
      description:
        "An easy-to-install dipole variant, higher in the middle and lower at the ends.",
    },
    gp: {
      title: "Ground Plane Antenna",
      description:
        "A vertical monopole antenna with horizontal or downward-sloping radials.",
    },
    positiveV: {
      title: "Positive V Antenna",
      description:
        "A dipole with upward-angled arms, suitable for rooftop installation.",
    },
    quad: {
      title: "Quad Antenna",
      description:
        "A directional antenna made of square loops, featuring high gain and low noise.",
    },
    moxon: {
      title: "Moxon Antenna",
      description:
        "A compact rectangular directional antenna with excellent front-to-back ratio.",
    },
    endFed: {
      title: "End-Fed Half Wave",
      description:
        "A multi-band portable antenna using a 49:1 impedance transformer, fed at one end.",
    },
  },

  tools: {
    yagiCalculator: {
      title: "Yagi Calculator",
      description:
        "A Yagi antenna design tool based on the DL6WU long boom model & VK5DJ correction algorithm.",
    },
  },

  meta: {
    siteName: "Ham Radio Visualization",
    keywords:
      "ham radio, antenna demos, 3D visualization, vertical polarization, horizontal polarization, circular polarization, Yagi antenna, GP antenna, inverted V antenna, positive V antenna, quad antenna, Moxon antenna",
  },
} satisfies typeof import("~/locales/zh/common").default;
