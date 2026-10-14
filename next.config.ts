import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // Alte Adressen aus der Zeit mit nur einem Buch (Lesezeichen, installierte App).
  async redirects() {
    return ["kapitel", "figuren", "figuren/:id", "beziehungen", "notizen", "tipps", "denken"].map((path) => ({
      source: `/${path}`,
      destination: `/karamasow/${path}`,
      permanent: false,
    }));
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
