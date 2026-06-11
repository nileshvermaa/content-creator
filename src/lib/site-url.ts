/**
 * Canonical site URL, in priority order:
 * 1. NEXT_PUBLIC_SITE_URL — set this in Vercel once a custom domain exists
 * 2. VERCEL_URL — auto-injected on Vercel deployments
 * 3. localhost fallback for local dev
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
