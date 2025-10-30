import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    reactCompiler: true,
    preloadEntriesOnStart: false,
    webpackMemoryOptimizations: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },

  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = {
        type: "memory",
      };
    }

    return config;
  },

  compiler: {
    styledComponents: true,
    emotion: true,
    // removeConsole: {
    //   exclude: ["error", "warn"],
    // },
  },

  reactStrictMode: true,
  swcMinify: true,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
