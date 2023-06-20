/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: "AIzaSyBaY0RPek6Sr_BvScKaG9W1Rh2pyHeFxrM",
  },

  images: {
    domains: ["images.unsplash.com", "localhost", "cuppa.onrender.com"],
  },
};

module.exports = nextConfig;
