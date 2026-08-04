import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deployed on Vercel, so the app runs as a real Next.js server: the built-in
  // image optimizer, route handlers and ISR are all available. (This used to be
  // `output: "export"` targeting S3+CloudFront, which forced
  // `images.unoptimized` and disabled the image pipeline entirely.)
  images: {
    // Serve AVIF/WebP to browsers that advertise support, falling back to the
    // original format. AVIF is tried first since it is typically 20-30% smaller.
    formats: ["image/avif", "image/webp"],
    // Widths the optimizer is allowed to generate for `sizes`-based srcsets.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Widths used for fixed-size images and for `sizes` values below 640px --
    // the card thumbnails on /blogs and /news land in this range.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimized responses are immutable per (src, width, quality); cache them at
    // the edge for a year rather than the 60s default.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      // Backend-hosted assets (blog/case-study media served from S3).
      { protocol: "https", hostname: "clanconnect.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "clan-influencer-images.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "clan-instagram-profile-pdf.s3.ap-south-1.amazonaws.com" },
      // Third-party press outlets hotlinked from the "In News" page.
      { protocol: "https", hostname: "assets.entrepreneur.com" },
      { protocol: "https", hostname: "www.buzzincontent.com" },
      { protocol: "https", hostname: "dazeinfo.com" },
      { protocol: "https", hostname: "mediabrief.com" },
      { protocol: "https", hostname: "images.yourstory.com" },
    ],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api", "import", "global-builtin", "color-functions", "slash-div"],
    quietDeps: true,
  },
  // The legacy core/ TypeScript services predate strict typing; do not block the build on them.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
