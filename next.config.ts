import withPWA from "next-pwa";
import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "example.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

const nextConfig = withPWA({
  ...baseConfig,
  dest: "public", // Assure-toi que tu utilises la bonne option pour next-pwa
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default nextConfig;
