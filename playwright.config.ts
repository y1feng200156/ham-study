import { defineConfig, devices } from "@playwright/test";

const e2ePort = Number(process.env.HAM_STUDY_E2E_PORT ?? 5173);
if (!Number.isInteger(e2ePort) || e2ePort < 1 || e2ePort > 65535) {
  throw new Error("HAM_STUDY_E2E_PORT must be a valid TCP port");
}
const baseURL = `http://localhost:${e2ePort}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "line",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: `npm run dev -- --port ${e2ePort} --strictPort`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
