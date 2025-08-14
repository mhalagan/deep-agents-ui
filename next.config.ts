import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Enable server-side runtime configuration
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  // Disable x-powered-by header
  poweredByHeader: false,
  // Enable strict mode for React
  reactStrictMode: true,
  // Enable SWC minification for better performance
  swcMinify: true,
};

export default nextConfig;
