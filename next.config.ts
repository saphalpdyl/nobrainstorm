import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
        protocol: "https",
        pathname: "private/org-CXIlbbIwXxTqOgyzu53Jvmwv/*"
      }
    ]
  }
};

export default nextConfig;
