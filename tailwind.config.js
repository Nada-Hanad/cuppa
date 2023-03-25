/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-color": "#EBEEF3",
        "dark-grey": "#343A49",
        "bg-grey": "#D3D5D4",
        "header-bg": "#d5d8e0",
        dark: "#222326",
      },
    },
  },
  plugins: [],
};
