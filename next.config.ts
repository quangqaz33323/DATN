import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    reactCompiler: true,
  },

  compiler: {
    styledComponents: true,

    emotion: true,

    // removeConsole: {
    //   exclude: ["error", "warn"],
    // },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);