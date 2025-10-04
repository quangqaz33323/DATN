import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    reactCompiler: true,
  },

  compiler: {
    styledComponents: true,

    emotion: true,

    removeConsole: {
      exclude: ["error", "warn"],
    },
  },
};

export default nextConfig;
