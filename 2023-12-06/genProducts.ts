import * as fs from "fs";

function product({
  title = "Lorem ipsum title",
  isNew = false,
  price = "$10",
  oldPrice = "",
  image = "",
  discount = "",
}) {
  return { title, isNew, price, oldPrice, image, discount };
}

function simple(title, price, image) {
  return product({ title, price, image });
}

function withNew(title, price, image) {
  return product({ title, price, image, isNew: true });
}

function withDiscount(title, price, image, discount, oldPrice) {
  return product({ title, price, image, discount, oldPrice });
}

fs.writeFileSync(
  "./products.json",
  JSON.stringify([
    withNew("Christmas Tree Decoration", "$19.99", ""),
    withDiscount("Gift Box", "$9.99", "", "-23%", "$12.99"),
    simple("Gingerbread Man Cookie", "$4.99", ""),
    simple("Snowflake Decoration", "$12.99", ""),
    simple("Star-shaped Cookie", "$12.99", ""),
    simple("Santa's Hat", "$39.99", ""),
    withNew("Candy Cane", "$8.99", ""),
    simple("Snowman Decoration", "$39.99", ""),
    withDiscount("Christmas Ball", "$3.99", "", "-20%", "$4.99"),
    simple("Christmas Red Socks", "$29.99", ""),
    simple("Red Ribbon", "$3.99", ""),
    simple("Christmas Tree Cookie", "$13.99", ""),
  ]),
);
