// src/lib/config.ts
import { env } from "@/lib/env";

const isBrowser = typeof window !== "undefined";
const isLocalHost =
  isBrowser &&
  ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);

// Optional override for debugging via <script> window.__API_BASE__ = "https://...";
const windowApiBase = (() => {
  if (!isBrowser) return "";
  const v = (window as any).__API_BASE__?.trim?.() || "";
  try {
    if (!v) return "";
    // allow absolute https/http URLs
    if (v.startsWith("http://") || v.startsWith("https://")) return v;
    // allow same-origin path (e.g., "/api") only in local dev
    if (v.startsWith("/") && isLocalHost) return v;
    return "";
  } catch {
    return "";
  }
})();

// Normalize: remove trailing slash
function normalizeBase(u: string) {
  if (!u) return u;
  return u.endsWith("/") ? u.slice(0, -1) : u;
}

/**
 * Resolution order:
 * 1) env.VITE_API_BASE (always wins in prod; set this on Render)
 * 2) window.__API_BASE__ (manual override for debugging)
 * 3) local dev default: http://localhost:3000/api
 *
 * We deliberately DO NOT fall back to "/api" in prod,
 * because the frontend is a static site (no proxy).
 */
const resolvedApiBase =
  env.VITE_API_BASE?.trim() ||
  windowApiBase ||
  (isLocalHost ? "http://localhost:3000/api" : "");

if (!resolvedApiBase && isBrowser && !isLocalHost) {
  // Helpful runtime hint if someone forgot to set VITE_API_BASE in prod
  // eslint-disable-next-line no-console
  console.warn(
    "[config] VITE_API_BASE is not set; API calls will fail on static hosting."
  );
}

export const API_BASE = normalizeBase(resolvedApiBase);

// Stripe is fine as-is
export const STRIPE_PUBLISHABLE_KEY = env.VITE_STRIPE_PUBLISHABLE_KEY;

/** Helper to build URLs without duplicate slashes */
export function apiUrl(path: string) {
  const base = API_BASE || "";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
