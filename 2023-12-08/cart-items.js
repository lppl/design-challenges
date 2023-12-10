const products = require(require("path").resolve("./products.js"));

function prod(i, count) {
  console.assert(i < products.length);
  const product = products[i];
  return {
    count,
    product,
    id: product.id,
    totalPrice: "$" + count * Number(product.priceRaw),
    totalPriceRaw: count * Number(product.priceRaw),
  };
}

const items = [prod(2, 1), prod(4, 5), prod(5, 2)];

const totalPriceRaw = items.reduce((s, c) => s + Number(c.totalPrice.replace("$", "")), 0).toFixed(2);
module.exports = {
  items,
  totalPrice: "$" + totalPriceRaw,
  totalPriceRaw,
};
