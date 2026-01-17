// biome-ignore lint/style/useNodejsImportProtocol: path
import fs from "fs";
// biome-ignore lint/style/useNodejsImportProtocol: path
import path from "path";
import puppeteer from "puppeteer";
import { demos } from "../app/data/items";

// Use the local dev server
const BASE_URL = "http://localhost:5173";
const OUTPUT_DIR = path.join(process.cwd(), "public/images/demos");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

(async () => {
  console.log("🚀 Starting screenshot generation...");

  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 800,
      height: 600,
      deviceScaleFactor: 2, // High DPI for crisp images
    },
  });

  const page = await browser.newPage();
  // Browser viewport (Desktop size per user request)
  await page.setViewport({ width: 1400, height: 810, deviceScaleFactor: 1 });

  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", (err) =>
    console.log("PAGE ERROR:", (err as Error).toString())
  );

  for (const demo of demos) {
    if (!demo.href.startsWith("/demos")) continue;
    const name = demo.href.split("/").pop();

    const url = `${BASE_URL}${demo.href}`;
    const filePath = path.join(OUTPUT_DIR, `${name}.webp`);

    console.log(`📸 Processing: ${name} (${url})`);

    try {
      // Use domcontentloaded + manual wait to avoid HMR keeping network busy
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

      // Clean up the UI for the screenshot
      // Strategy: Force canvas to specific size (860x400) at top-left.
      // We do NOT hide body > * because that hides the React root and thus the canvas.
      const css = `
        /* Reset body/html to allow our forced canvas */
        html, body {
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }

        /* Target the canvas acts as the 'scene' */
        canvas {
          display: block !important;
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          /* Force standard size regardless of viewport */
          width: 860px !important;
          height: 400px !important;
          z-index: 2147483647 !important;
          visibility: visible !important;
          border-radius: 0 !important;
        }
        
        /* Hide specific overlay classes we know exist */
        nav, header, footer, .absolute, button { 
          display: none !important; 
        }
        
        /* Exception: If canvas itself has .absolute class, unhide it! (it's covered by specific rule above but just in case) */
        /* Actually specific rule 'canvas' above has higher specificity/priority than '.absolute' usually? 
           Let's be safe: */
        canvas.absolute {
           display: block !important;
        }
      `;

      await page.addStyleTag({ content: css });

      // Wait for canvas to be present (even if not fully visible yet)
      const canvas = await page.waitForSelector("canvas", { timeout: 30000 });

      // Extra wait for WebGL to render
      await new Promise((r) => setTimeout(r, 5000));

      if (canvas) {
        // Fallback to page screenshot with clip.
        // Since we forced the canvas to 0,0 860x400, this is effectively a canvas screenshot
        // but robust against Puppeteer's visibility checks.
        await page.screenshot({
          path: filePath,
          type: "webp",
          quality: 90,
          clip: { x: 0, y: 0, width: 860, height: 400 },
        });
        console.log(`✅ Saved: ${filePath}`);
      }
    } catch (e) {
      console.error(`❌ Error capturing ${name}:`, e);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `${name}-error.png`),
      });
    }
  }

  await browser.close();
  console.log("✨ All screenshots generated!");
  process.exit(0);
})();
