import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "upload.wikimedia.org"],
     remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
