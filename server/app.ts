// Virtual module provided by React Router at build time
import * as build from "virtual:react-router/server-build";
import { createRequestHandler, RouterContextProvider } from "react-router";

const handler = createRequestHandler(build);

/**
 * Custom server entrypoint for Vercel
 */
export default async function (request: Request): Promise<Response> {
  const context = new RouterContextProvider();
  return handler(request, context);
}
