import type { NextConfig } from "next";

/**
 * Next.js configuration.
 *
 * Note: This project uses static export (`output: "export"`). All pages must be
 * compatible with static generation. We therefore keep auth as a lightweight
 * localStorage token and do client-side data loading via REST/WS.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
