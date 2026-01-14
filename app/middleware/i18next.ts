import { initReactI18next } from "react-i18next";
import { createCookie } from "react-router";
import { createI18nextMiddleware } from "remix-i18next/middleware";
import resources from "~/locales";
import "i18next";

// This cookie will be used to store the user locale preference
export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

const [i18nextMiddleware] = createI18nextMiddleware({
  detection: {
    supportedLanguages: ["zh", "zh-HK", "en-US"],
    fallbackLanguage: "zh",
    cookie: localeCookie,
    // Detect locale from URL pathname
    async findLocale(request) {
      const locale = new URL(request.url).pathname.split("/").at(1);
      if (locale === "en-US" || locale === "zh-HK") {
        return locale;
      }
      return "zh";
    },
  },
  i18next: {
    resources,
    defaultNS: "common",
  },
  plugins: [initReactI18next],
});

export { i18nextMiddleware };

export function getLocale(request: Request): string {
  // 1. Check URL first
  const url = new URL(request.url);
  const pathLocale = url.pathname.split("/")[1];
  if (pathLocale === "en-US" || pathLocale === "zh-HK") {
    return pathLocale;
  }

  // Fallback
  return "zh";
}

// This adds type-safety to the `t` function
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: (typeof resources)["zh"];
  }
}
