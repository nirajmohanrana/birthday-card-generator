/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    textShadow: {
      default: "0 2px 1px #fff",
    },
    extend: {
      fontFamily: {
        baloo: "'Baloo 2', cursive",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
