/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: "/site_jama",
  assetPrefix: "/site_jama",

  allowedDevOrigins: ["192.168.0.17"],
};

export default nextConfig;