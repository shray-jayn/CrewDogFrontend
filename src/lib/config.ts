import { env } from "@/lib/env";

const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(
  window.location.hostname
);

const sanitizedWindowBase = (() => {
  const v = (window as any).__API_BASE__?.trim?.() || "";
  try {
    if (!v) return "";
    if (v.startsWith("/")) return v;
    const u = new URL(v, window.location.origin);
    if (isLocalHost && ["localhost", "127.0.0.1", "::1"].includes(u.hostname))
      return u.href;
    if (!isLocalHost && u.origin === window.location.origin) return u.href;
    return "";
  } catch {
    return "";
  }
})();

export const API_BASE =
  sanitizedWindowBase ||
  env.VITE_API_BASE ||
  (isLocalHost ? "http://localhost:3000/api" : "/api");

export const STRIPE_PUBLISHABLE_KEY = env.VITE_STRIPE_PUBLISHABLE_KEY;
