/// <reference types="@cloudflare/workers-types" />
import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 关键修复：如果是静态资源路径，直接交给 Cloudflare 静态资产绑定处理
    if (url.pathname.startsWith("/assets/")) {
      try {
        // 使用 env.ASSETS 手动抓取资源，这会触发 Cloudflare 的默认缓存逻辑
        const response = await env.ASSETS.fetch(request);
        // 如果资源存在，直接返回
        if (response.status < 400) return response;
      } catch (e) {
        console.error("Static Asset Fetch Error:", e);
      }
    }
    try {
      return await requestHandler(request, {
        cloudflare: { env, ctx },
      });
    } catch (error) {
      console.error("Worker Request Handler Crashed:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
