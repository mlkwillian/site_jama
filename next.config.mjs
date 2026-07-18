/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/site_jama" : "",
  assetPrefix: isProd ? "/site_jama" : "",

  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/site_jama" : "",
  },
};

export default nextConfig;