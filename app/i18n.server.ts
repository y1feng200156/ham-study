import FSBackend from "i18next-fs-backend";
import { RemixI18Next } from "remix-i18next/server";
import { resolve } from "node:path";
import yaml from "js-yaml";
import i18n from "./i18n"; // your i18n configuration file

const remixI18Next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    // Prefer URL path detection, fallback to header
    findLocale: async (request) => {
      const url = new URL(request.url);
      const possibleLocale = url.pathname.split("/")[1];

      if (i18n.supportedLngs.includes(possibleLocale)) {
        return possibleLocale;
      }
      return null;
    },
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve("./public/locales/{{lng}}/{{ns}}.yaml"),
      parse: (data: string) => yaml.load(data),
    },
  },
  // The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin-in to load translations from the file system
  plugins: [FSBackend],
});

export default remixI18Next;
