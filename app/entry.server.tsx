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
  const userAgent = request.headers.get("user-agent");
  const url = new URL(request.url);

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
        responseStatusCode = 500;
        console.error("React Rendering Error:", error);
      },
      signal: request.signal,
    },
  );

  if (isbot(userAgent || "")) {
    await body.allReady;
  }

  // 动态注入 CSS 预加载
  const routes = entryContext.manifest.routes;

  Object.values(routes).forEach((route: any) => {
    if (route.imports) {
      route.imports.forEach((file: string) => {
        if (file.endsWith(".css")) {
          responseHeaders.append("Link", `<${file}>; rel=preload; as=style`);
        }
      });
    }
    // 也要检查路由本身定义的 css 文件
    if (route.css) {
      route.css.forEach((file: string) => {
        responseHeaders.append("Link", `<${file}>; rel=preload; as=style`);
      });
    }
  });
  // --- 动态注入 CSS 预加载结束 ---

  responseHeaders.set("Content-Type", "text/html");

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
