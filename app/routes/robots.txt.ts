import type { Route } from "./+types/robots.txt";

export const loader = ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const origin = url.origin;

  const robots = `
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`.trim();

  return new Response(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
