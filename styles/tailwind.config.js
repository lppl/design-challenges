/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
  content: ["../**/*.html"],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "1fr minmax(700px, 1020px) 1fr",
        "product-gallery": "repeat(auto-fit, minmax(210px, 1fr))",
        "cart-item": "120px auto",
      },
      gridTemplateRows: {
        layout: "min-content max-content",
        "product-gallery": "repeat(auto-fit, minmax(210px, 1fr))",
        "product-item": "28px 146px 36px 32px 32px",
        "cart-item": "repeat(3, min-content)",
      },
      gridTemplateAreas: {
        layout: [". top-nav .", ". content ."],
      },
    },
  },
};
