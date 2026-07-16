/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: "/",
  assetPrefix: "/",

  allowedDevOrigins: ["192.168.0.17"],
};

export default nextConfig;