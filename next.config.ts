import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  // Enables app/global-not-found.tsx: a routing-level 404 for URLs that match
  // no route at all. Required here because the root layout is the dynamic
  // app/[locale]/layout.tsx, so no root app/not-found.tsx can be composed.
  experimental: {
    globalNotFound: true,
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
