# ClanConnect Web

Marketing website for **ClanConnect** — an influencer marketing platform. Built with
**Next.js 16 (App Router)** and migrated from a React (Vite) single-page app; a small
compatibility shim (`lib/router.jsx`) maps the original `react-router-dom` API onto
Next.js navigation so the migrated components work unchanged.

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, React-Bootstrap + Bootstrap 5, MUI |
| Styling | SCSS + CSS (`assets/stylesheets`) |
| Animation | Framer Motion, GSAP |
| Carousels / media | react-slick, react-player |
| Data fetching | Axios (`core/services`) |
| Language | TypeScript + JSX |

## Requirements

- Node.js 18.18+ (Node 20+ recommended)
- npm

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (Turbopack) in development mode |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | Run ESLint |

## Environment variables

Configuration lives in `.env` files and is surfaced through `config/config.ts`.
All values are **public** (API/UI URLs, Razorpay *publishable* key, reCAPTCHA *site*
key), so every variable is prefixed with `NEXT_PUBLIC_` — Next.js only exposes those
to the browser, and **inlines them at build time**.

| File | Used by | Committed? |
|------|---------|------------|
| `.env.example` | Reference template | Yes |
| `.env.development` | `next dev` | No (git-ignored) |
| `.env.production` | `next build` / `next start` | No (git-ignored) |
| `.env`, `.env*.local` | Local overrides | No (git-ignored) |

All actual `.env` files are git-ignored; only `.env.example` is committed. Copy it to
create your local files (`cp .env.example .env.development`) and fill in the values.

Next.js picks the file automatically from the command's mode:

- `npm run dev` → development mode → `.env.development`
- `npm run build` → production mode → `.env.production`

Because `NEXT_PUBLIC_*` values are baked in during `next build`, changing an env
value requires a **rebuild** to take effect. On a host such as Vercel, set these same
variables in the project's dashboard — host/shell env vars take precedence over the
committed files.

Available variables:

```bash
NEXT_PUBLIC_BASE_URL=            # API base URL
NEXT_PUBLIC_BASE_URL_WEB=        # Marketing web base URL
NEXT_PUBLIC_BASE_URL_UI=         # App UI base URL
NEXT_PUBLIC_PAYMENT_GATEWAY_KEY= # Razorpay publishable key (rzp_test_* / rzp_live_*)
NEXT_PUBLIC_CAPTCHA_SITE_KEY=    # Google reCAPTCHA site key
```

Import them from the typed accessor rather than reading `process.env` directly:

```ts
import { BASE_URL, PAYMENT_GATEWAY_KEY } from "@/config/config";
```

## Project structure

```
app/                 # App Router routes + root layout (app/layout.tsx)
components/           # Page and shared UI components
  pages/             #   route-specific components (Home, About, News, ...)
config/config.ts     # Typed env-backed configuration
core/services/       # Axios API service modules
data/                # Static content (news, case studies, team, FAQs, ...)
layout/              # Header / Footer
lib/                 # react-router-dom compatibility shim, Helmet, image helpers
assets/              # Global SCSS/CSS and static assets
public/              # Publicly served static files
```

### Routes

The site is statically driven from `app/`. Notable pages:

`/` · `/about_us` · `/brands` · `/influencers` · `/case_studies` · `/blogs` ·
`/news` · `/faqs` · `/pricing` · `/package` · `/our_business_models` ·
`/contact_us` · `/request_demo` and the legal pages
(`/privacy_policy`, `/terms_condition`, `/refund_cancellation_policy`,
`/pricing_policy`).

## Deployment

```bash
npm run build
npm run start
```

Set the `NEXT_PUBLIC_*` variables for the target environment before building
(in the host dashboard or `.env.production`). Any `NEXT_PUBLIC_*` change needs a
rebuild to take effect.
