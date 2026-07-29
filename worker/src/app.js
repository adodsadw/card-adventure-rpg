import worker from "./index.js";

export const APP_VERSION = "1.8.5";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/health") {
      return new Response(JSON.stringify({
        ok: true,
        version: APP_VERSION,
        serverAuthoritative: true,
        admin: true
      }), {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store"
        }
      });
    }
    return worker.fetch(request, env, ctx);
  }
};
