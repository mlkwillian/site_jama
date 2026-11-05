/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: "/site_jama",

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.0.8"],
};

export default nextConfig;