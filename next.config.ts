import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/crafts/seagrass", destination: "/crafts/khoos", permanent: true },
      { source: "/crafts/seagrass/:path*", destination: "/crafts/khoos/:path*", permanent: true },
      { source: "/en/crafts/seagrass", destination: "/en/crafts/khoos", permanent: true },
    ];
  },
};

export default nextConfig;
