/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  content: [
    "./src/routes/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      monoton: ["Monoton", "sans-serif"],
      shantell: ["Shantell", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
