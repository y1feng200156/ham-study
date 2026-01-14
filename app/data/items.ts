export interface Item {
  i18nKey: string;
  href: string;
  category: "demo" | "tool";
}

export const demos: Item[] = [
  {
    i18nKey: "demoCards.vertical",
    href: "/demos/vertical-polarization",
    category: "demo",
  },
  {
    i18nKey: "demoCards.horizontal",
    href: "/demos/horizontal-polarization",
    category: "demo",
  },
  {
    i18nKey: "demoCards.circular",
    href: "/demos/circular-polarization",
    category: "demo",
  },
  {
    i18nKey: "demoCards.elliptical",
    href: "/demos/elliptical-polarization",
    category: "demo",
  },
  {
    i18nKey: "demoCards.dipoleAntenna",
    href: "/demos/dipole-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.yagi",
    href: "/demos/yagi-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.invertedV",
    href: "/demos/inverted-v-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.gp",
    href: "/demos/gp-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.positiveV",
    href: "/demos/positive-v-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.quad",
    href: "/demos/quad-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.moxon",
    href: "/demos/moxon-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.endFed",
    href: "/demos/end-fed-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.longWireAntenna",
    href: "/demos/long-wire-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.windomAntenna",
    href: "/demos/windom-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.hb9cv",
    href: "/demos/hb9cv-antenna",
    category: "demo",
  },
  {
    i18nKey: "demoCards.magneticLoopAntenna",
    href: "/demos/magnetic-loop-antenna",
    category: "demo",
  },
];

export const tools: Item[] = [
  {
    i18nKey: "tools.yagiCalculator",
    href: "/tools/yagi-calculator",
    category: "tool",
  },
];
