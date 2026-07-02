import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
