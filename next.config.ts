// @ts-check

import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "example.com",
      "localhost:3000",
      "firebasestorage.googleapis.com",
      "ko-zua.vercel.app",
      "upload.wikimedia.org",
      "cdnwp.dealerk.com",
      "i.gaw.to",
      "googleusercontent.com",
      "lh3.googleusercontent.com"
    ],
  },
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
