import Router from "@koa/router";
import { sendData } from "./formatters.ts";
import { products } from "./data/products.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.template = "/shop/shop.pug";
  sendData(ctx, 200, {
    cart: {},
    filters: [],
    products,
  });
});

router.get("/product", (ctx) => {
  sendData(ctx, 200, { products });
});

router.get("/product/:i", (ctx) => {
  const i = Number(ctx.params.i);
  if (i in products) {
    sendData(ctx, 200, { product: products[i] });
  } else {
    sendData(ctx, 404, { product: null });
  }
});

export { router };
