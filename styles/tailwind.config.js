/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
  content: ["../**/*.html"],
  mode: "jit",
  theme: {
    extend: {},
  },
};
