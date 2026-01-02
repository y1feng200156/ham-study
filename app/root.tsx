import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export async function loader({ request }: Route.LoaderArgs) {
  return { origin: new URL(request.url).origin };
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "业余无线电可视化 (Ham Radio Visualization)" },
    {
      name: "description",
      content:
        "3D可视化演示各类（垂直、水平、圆极化等）天线电磁波传播原理。Interactive 3D visualization of amateur radio antenna polarization and propagation.",
    },
    { name: "twitter:title", content: "业余无线电可视化 (Ham Radio Visualization)" },
    { name: "twitter:description", content: "3D可视化演示各类（垂直、水平、圆极化等）天线电磁波传播原理。" },
  ];
};


export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
  { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192x192.png" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

import { Footer } from "./components/footer";

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  const origin = data?.origin || "";
  const image = `${origin}/og.webp`;
  const url = origin + location.pathname;

  return (
    <html lang="zh-CN" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Common Meta Tags placed here to persist across all routes */}
        <meta property="og:site_name" content="业余无线电可视化" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={url} />

        {/* JSON-LD Structured Data for WebSite - Only on Homepage */}
        {location.pathname === "/" && (
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires this
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "业余无线电可视化 (Ham Radio Visualization)",
                url: origin,
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${origin}/?q={search_term_string}`
                  },
                  "query-input": "required name=search_term_string"
                }
              }),
            }}
          />
        )}

        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-full">
        <main className="flex-1">
            {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
