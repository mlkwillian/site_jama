const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/site_jama" : "",
  assetPrefix: isProd ? "/site_jama/" : "",

  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/site_jama" : "",
  },
  
  allowedDevOrigins: ["192.168.0.17"],
};

export default nextConfig;