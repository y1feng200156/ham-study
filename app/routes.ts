import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

// Helper to generate demo routes with unique IDs
const getDemoRoutes = (idPrefix: string) => [
  route(
    "demos/vertical-polarization",
    "routes/demos/vertical-polarization.tsx",
    { id: `${idPrefix}-vertical` },
  ),
  route(
    "demos/horizontal-polarization",
    "routes/demos/horizontal-polarization.tsx",
    { id: `${idPrefix}-horizontal` },
  ),
  route(
    "demos/circular-polarization",
    "routes/demos/circular-polarization.tsx",
    { id: `${idPrefix}-circular` },
  ),
  route(
    "demos/elliptical-polarization",
    "routes/demos/elliptical-polarization.tsx",
    { id: `${idPrefix}-elliptical` },
  ),
  route("demos/yagi-antenna", "routes/demos/yagi-antenna.tsx", {
    id: `${idPrefix}-yagi`,
  }),
  route("demos/inverted-v-antenna", "routes/demos/inverted-v-antenna.tsx", {
    id: `${idPrefix}-inverted-v`,
  }),
  route("demos/gp-antenna", "routes/demos/gp-antenna.tsx", {
    id: `${idPrefix}-gp`,
  }),
  route("demos/positive-v-antenna", "routes/demos/positive-v-antenna.tsx", {
    id: `${idPrefix}-positive-v`,
  }),
  route("demos/quad-antenna", "routes/demos/quad-antenna.tsx", {
    id: `${idPrefix}-quad`,
  }),
  route("demos/moxon-antenna", "routes/demos/moxon-antenna.tsx", {
    id: `${idPrefix}-moxon`,
  }),
  route("demos/end-fed-antenna", "routes/demos/end-fed-antenna.tsx", {
    id: `${idPrefix}-end-fed`,
  }),
  route("tools/yagi-calculator", "routes/tools/yagi-calculator.tsx", {
    id: `${idPrefix}-yagi-tools`,
  }),
];

export default [
  // Global utility routes
  route("sitemap.xml", "routes/sitemap.xml.ts", { id: "sitemap" }),
  route("robots.txt", "routes/robots.txt.ts", { id: "robots" }),
  route("api/locales/:lng/:ns", "routes/api.locales.$lng.$ns.ts", {
    id: "api-locales",
  }),

  // Root routes (Default Language)
  index("routes/home.tsx", { id: "root-home" }),
  layout("routes/layout.tsx", { id: "root-layout" }, getDemoRoutes("root")),

  // Language prefixed routes
  route(":lang", "routes/i18n-layout.tsx", { id: "lang-root" }, [
    index("routes/home.tsx", { id: "lang-home" }),
    layout("routes/layout.tsx", { id: "lang-layout" }, getDemoRoutes("lang")),
  ]),
] satisfies RouteConfig;
