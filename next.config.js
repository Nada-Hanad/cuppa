/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: "AIzaSyBaY0RPek6Sr_BvScKaG9W1Rh2pyHeFxrM",
  },
  swcMinify: true, // Enable SWC minification

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
      };
    }

    return config;
  },

  images: {
    domains: ["images.unsplash.com", "localhost"],
  },
};

module.exports = nextConfig;
