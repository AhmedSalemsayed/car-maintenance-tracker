import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rrdowjxummyrbbamenzq.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
