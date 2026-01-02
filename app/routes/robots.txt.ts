import type { Route } from "./+types/robots.txt";

export const loader = ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const origin = url.origin;

	const content = `User-agent: *
Allow: /
Sitemap: ${origin}/sitemap.xml
`;

	return new Response(content, {
		status: 200,
		headers: {
			"Content-Type": "text/plain",
			encoding: "UTF-8",
		},
	});
};
