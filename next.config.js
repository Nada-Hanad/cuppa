/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		GOOGLE_MAPS_API_KEY: 'AIzaSyBaY0RPek6Sr_BvScKaG9W1Rh2pyHeFxrM',
	},
	swcMinify: true,

	images: {
		domains: ['images.unsplash.com', 'localhost'],
	},
};

module.exports = nextConfig;
