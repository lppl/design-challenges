/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
  content: ["./navbar.html"],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "1fr minmax(600px, 1020px) 1fr",
      },
      gridTemplateRows: {
        layout: "auto",
      },
      gridTemplateAreas: {
        layout: ["left content right"],
      },
    },
  },
};
