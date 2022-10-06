/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
        gray: {
          lighter: "#D4D4D4",
          light: "#F2F2F2",
          DEFAULT: "#6B7280",
          deep: "#374151",
        },
        overlay: "rgba(0,0,0, 0.3)",
        "overlay-hard": "rgba(0,0,0, 0.85)",
      },
    },
  },
  plugins: [],
};
