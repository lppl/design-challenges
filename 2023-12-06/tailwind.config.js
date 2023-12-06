/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./christmas-grid-layout.html"],
  theme: {
    extend: {
      gridTemplateColumns: {
        body: "max-content",
        items: "repeat(auto-fit, minmax(210px, 1fr))",
      },
      gap: {
        item: "22px",
      },
      gridTemplateRows: {
        item: "28px 146px 36px 32px 32px",
      },
    },
  },
};
