/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["EmpiraLight", "sans-serif"],
        futura: ["OPTIFutura-ExtraBlackCond", "sans-serif"],
      },
      colors: {
        "main-orange": "#FF2D08",
        "off-white": "#F3EFE7",
        "dark-gray": "#1E1E1E",
      },
    },
  },
  plugins: [],
};
