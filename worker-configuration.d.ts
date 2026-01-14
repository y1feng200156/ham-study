declare namespace Cloudflare {
  interface GlobalProps {
    mainModule: typeof import("./workers/app");
  }
  interface Env {
    ASSETS: Fetcher;
  }
}
interface Env extends Cloudflare.Env {}
