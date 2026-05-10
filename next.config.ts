import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages hosting
  output: "export",
  // Disable Next/Image optimization (no Vercel image server when self-hosting static)
  images: { unoptimized: true },
  // Emit out/foo/index.html so /foo works on static hosts
  trailingSlash: true,
};

export default nextConfig;
