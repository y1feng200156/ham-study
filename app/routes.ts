import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sitemap.xml", "routes/sitemap.xml.ts"),
  route("robots.txt", "routes/robots.txt.ts"),
  // Demos
  // Demos
  layout("routes/demos/layout.tsx", [
    route(
      "demos/vertical-polarization",
      "routes/demos/vertical-polarization.tsx"
    ),
    route(
      "demos/horizontal-polarization",
      "routes/demos/horizontal-polarization.tsx"
    ),
    route(
      "demos/circular-polarization",
      "routes/demos/circular-polarization.tsx"
    ),
    route(
      "demos/elliptical-polarization",
      "routes/demos/elliptical-polarization.tsx"
    ),
    route("demos/yagi-antenna", "routes/demos/yagi-antenna.tsx"),
    route("demos/inverted-v-antenna", "routes/demos/inverted-v-antenna.tsx"),
    route("demos/gp-antenna", "routes/demos/gp-antenna.tsx"),
    route("demos/positive-v-antenna", "routes/demos/positive-v-antenna.tsx"),
    route("demos/quad-antenna", "routes/demos/quad-antenna.tsx"),
    route("demos/moxon-antenna", "routes/demos/moxon-antenna.tsx"),
  ]),
] satisfies RouteConfig;
