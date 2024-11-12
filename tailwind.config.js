/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
    colors: {
      black: "#000000",
      darkGrey1: "#777777",
      darkGrey2: "#DDDDDD",
      lightGrey1: "#F0F0F0",
      lightGrey2: "#F9F9F9",
      white: "#FFFFFF",
      blue: "#353A5D",
      red: "#BF1E2E",
      yellow: "#FF9B19",
      hoverBlue: "#4A4E6E"
    },
  },
  plugins: [],
};
