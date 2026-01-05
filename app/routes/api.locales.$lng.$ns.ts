import { cacheHeader } from "pretty-cache-header";
import { data } from "react-router";
import resources from "~/locales";

const supportedLngs = ["zh", "zh-HK", "en-US"] as const;
const supportedNs = ["common", "demos", "scene"] as const;

type SupportedLng = (typeof supportedLngs)[number];
type SupportedNs = (typeof supportedNs)[number];

export async function loader({
  params,
}: {
  params: { lng: string; ns: string };
}) {
  const lng = params.lng as SupportedLng;
  const ns = params.ns as SupportedNs;

  if (!supportedLngs.includes(lng)) {
    return data({ error: "Unsupported language" }, { status: 400 });
  }

  if (!supportedNs.includes(ns)) {
    return data({ error: "Unsupported namespace" }, { status: 400 });
  }

  const langResources = resources[lng as keyof typeof resources];
  const nsResource = langResources[ns as keyof typeof langResources];

  const headers = new Headers();

  // On production, add cache headers
  if (process.env.NODE_ENV === "production") {
    headers.set(
      "Cache-Control",
      cacheHeader({
        maxAge: "5m",
        sMaxage: "1d",
        staleWhileRevalidate: "7d",
        staleIfError: "7d",
      }),
    );
  }

  return data(nsResource, { headers });
}
