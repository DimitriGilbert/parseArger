import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Clean URLs
  trailingSlash: true,

  // Skip build verification for static export
  skipTrailingSlashRedirect: false,
};

export default nextConfig;
