import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> produces `out/` for upload to S3 + CloudFront.
  output: "export",
  // next/image optimization requires a server; disable it for a static export.
  images: { unoptimized: true },
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
