import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    imagetools(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ["@react-three/fiber", "@react-three/drei", "three"],
  },
});
