import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aurelia-fine-jewelry",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
