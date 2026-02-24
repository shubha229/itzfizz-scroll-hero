import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/itzfizz-scroll-hero" : "",
  assetPrefix: isProd ? "/itzfizz-scroll-hero/" : "",
};

export default nextConfig;