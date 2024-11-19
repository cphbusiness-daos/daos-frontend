/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#353A5D",
        "primary-red": "#BF1E2F",
        gray: {
          light: "#F0F0F0",
          normal: "#DDDDDD",
          dark: "#777777",
        },
      },
    },
  },
  plugins: [],
};
