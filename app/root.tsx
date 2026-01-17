import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import {
  getLocale,
  i18nextMiddleware,
  localeCookie,
} from "~/middleware/i18next";
import type { Route } from "./+types/root";
import "~/app.css";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { useNonce } from "./components/nonce-context";

export const middleware = [i18nextMiddleware];

import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const origin = url.origin;
  const segments = url.pathname.split("/").filter(Boolean);

  // Redirect /zh/... to /... (Remove 'zh' prefix for default language)
  if (segments.length > 0 && segments[0] === "zh") {
    segments.shift(); // Remove 'zh'
    const newPath = `/${segments.join("/")}${url.search}`;
    throw redirect(newPath, 301); // 301 Permanent Redirect
  }

  const locale = await getLocale(request);
  return data(
    { locale, origin },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } },
  );
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "业余无线电可视化 (Ham Radio Visualization)" },
    {
      name: "description",
      content:
        "3D可视化演示各类（垂直、水平、圆极化等）天线电磁波传播原理。Interactive 3D visualization of amateur radio antenna polarization and propagation.",
    },
    {
      name: "twitter:title",
      content: "业余无线电可视化 (Ham Radio Visualization)",
    },
    {
      name: "twitter:description",
      content: "3D可视化演示各类（垂直、水平、圆极化等）天线电磁波传播原理。",
    },
  ];
};

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", sizes: "any" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "48x48",
    href: "/favicon-48x48.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/favicon-192x192.png",
  },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({
  children,
  loaderData,
}: {
  children: React.ReactNode;
  loaderData: { origin: string };
}) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const origin = loaderData?.origin || "https://ham.charlesify.com";
  const nonce = useNonce();

  return (
    <html lang={i18n.language} dir={i18n.dir(i18n.language)} className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Common Meta Tags */}
        <meta property="og:site_name" content="业余无线电可视化" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${origin}${location.pathname}`} />
        <meta property="og:image" content={`${origin}/og.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${origin}/og.webp`} />

        <link rel="canonical" href={origin + location.pathname} />

        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-full">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App({ loaderData: { locale } }: Route.ComponentProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) i18n.changeLanguage(locale);
  }, [locale, i18n]);

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
