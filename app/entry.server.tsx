import { createInstance } from "i18next";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import type { EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import resources from "./locales";
import { getLocale } from "./middleware/i18next";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext,
) {
  const shellRendered = false;
  const userAgent = request.headers.get("user-agent");

  const instance = createInstance();
  const lng = await getLocale(request);
  const ns = ["common"]; // Default namespace

  await instance.use(initReactI18next).init({
    lng,
    ns,
    defaultNS: "common",
    fallbackLng: "zh",
    supportedLngs: ["zh", "zh-HK", "en-US"],
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
  });

  const body = await renderToReadableStream(
    <I18nextProvider i18n={instance}>
      <ServerRouter context={entryContext} url={request.url} />
    </I18nextProvider>,
    {
      onError(error: unknown) {
        responseStatusCode = 500;
        if (shellRendered) {
          console.error(error);
        }
      },
      signal: request.signal,
    },
  );

  if (isbot(userAgent || "")) {
    await body.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
