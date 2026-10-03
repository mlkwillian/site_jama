/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/site_jama",
  assetPrefix: "/site_jama/",

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.0.17"],
};

export default nextConfig;