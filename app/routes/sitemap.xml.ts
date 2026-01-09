import { demos, tools } from "~/data/items";
import type { Route } from "./+types/sitemap.xml";

export const loader = ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const origin = url.origin;

  const demoUrls = demos
    .map(
      (demo) => `
  <url>
    <loc>${origin}${demo.href}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join("");

  const toolUrls = tools
    .map(
      (tool) => `
  <url>
    <loc>${origin}${tool.href}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join("");

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${demoUrls}${toolUrls}
</urlset>
`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  });
};
