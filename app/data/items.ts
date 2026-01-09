export interface Item {
  i18nKey: string;
  href: string;
  category: "demo" | "tool";
}

export const demos: Item[] = [
  {
    i18nKey: "demos.vertical",
    href: "/demos/vertical-polarization",
    category: "demo",
  },
  {
    i18nKey: "demos.horizontal",
    href: "/demos/horizontal-polarization",
    category: "demo",
  },
  {
    i18nKey: "demos.circular",
    href: "/demos/circular-polarization",
    category: "demo",
  },
  {
    i18nKey: "demos.elliptical",
    href: "/demos/elliptical-polarization",
    category: "demo",
  },
  {
    i18nKey: "demos.dipoleAntenna",
    href: "/demos/dipole-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.yagi",
    href: "/demos/yagi-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.invertedV",
    href: "/demos/inverted-v-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.gp",
    href: "/demos/gp-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.positiveV",
    href: "/demos/positive-v-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.quad",
    href: "/demos/quad-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.moxon",
    href: "/demos/moxon-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.endFed",
    href: "/demos/end-fed-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.longWireAntenna",
    href: "/demos/long-wire-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.windomAntenna",
    href: "/demos/windom-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.hb9cv",
    href: "/demos/hb9cv-antenna",
    category: "demo",
  },
  {
    i18nKey: "demos.magneticLoopAntenna",
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
