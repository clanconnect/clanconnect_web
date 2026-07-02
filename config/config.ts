// App configuration.
//
// Values come from environment variables so we can switch between LOCAL / STAGE
// / LIVE without editing source. Because these are all read in the browser they
// must be prefixed with NEXT_PUBLIC_ (Next.js only exposes those to client code)
// and are inlined at build time — each environment needs its own build.
//
// Set values in:
//   .env.development  -> used by `next dev`
//   .env.production   -> used by `next build` / `next start`
//   .env*.local       -> local, uncommitted overrides
//
// None of these are secret (Razorpay publishable key, reCAPTCHA *site* key,
// public URLs), so they are safe to expose to the client.

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const BASE_URL_WEB = process.env.NEXT_PUBLIC_BASE_URL_WEB!;
export const BASE_URL_UI = process.env.NEXT_PUBLIC_BASE_URL_UI!;
export const PAYMENT_GATEWAY_KEY = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_KEY!;
export const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!;
