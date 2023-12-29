import Koa, { Context, Next } from "koa";
import Router from "@koa/router";
import { compileFile } from "pug";
import * as path from "path";
import ESI from "nodesi";
import { products } from "../data/products.ts";

const port = parseInt(process.env.PORT || "3000");

const app = new Koa();
const router = new Router();

const enum StatusCode {
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

class HttpError extends Error {
  constructor(
    readonly status: StatusCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}

function getRenderer(template: string | undefined): undefined | ReturnType<typeof compileFile> {
  if (!template) {
    return undefined;
  }

  const filename = path.join(__dirname, "..", "..", template);
  const extname = path.extname(filename);

  if (extname !== ".pug") {
    throw new HttpError(StatusCode.BAD_REQUEST, "Incorrect template name");
  }

  try {
    return compileFile(filename);
  } catch (e) {
    console.error(e);
    throw new HttpError(StatusCode.INTERNAL_SERVER_ERROR, "Template compilation failed", { cause: e });
  }
}

async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    const status = Number(err?.status || 500);
    const message = String(err?.message || "Internal Server Error");
    sendMessage(ctx, status, message);
    ctx.app.emit("error", err, ctx);
  }
}

const esi = new ESI({
  allowedHosts: ["http://localhost"],
  baseUrl: `http://localhost:${port}`,
  logTo: process.stdout,
  onError(src: string, error: any) {
    const { message } = error;
    console.error(`esi:include failed with message: ${message} `);
    console.error(`esi:include(src=${src})`);
  },
});

async function esiHandler(ctx: Context, next: Next) {
  await next();
  if (ctx.type === "text/html") {
    const body = await esi.process(ctx.body);
    ctx.body = body;
  }
}

function sendMessage(ctx: Context, status: number, message: string) {
  sendJson(ctx, status, { status, message });
}

function sendJson(ctx: Context, status: number, body: unknown) {
  ctx.status = status;
  ctx.type = "application/json";
  ctx.body = body;
}

function sendHTML(ctx: Context, status: number, body: string) {
  ctx.status = status;
  ctx.type = "text/html";
  ctx.body = body;
}

function getTemplate(ctx: Context) {
  const template = ctx.request.query.template;
  if (typeof template === "string") {
    return template;
  } else if (Array.isArray(template)) {
    return template[0];
  } else {
    return undefined;
  }
}

function sendData(ctx: Context, status: number, data: unknown) {
  const render = getRenderer(getTemplate(ctx));
  if (render) {
    sendHTML(ctx, status, render(data || {}));
  } else {
    sendJson(ctx, status, data);
  }
}

router.get("/product", (ctx) => {
  sendData(ctx, 200, products);
});

router.get("/product/:i", (ctx) => {
  const i = Number(ctx.params.i);
  if (i in products) {
    sendData(ctx, 200, { item: products[i] });
  } else {
    sendData(ctx, 404, { item: null });
  }
});

app.use(errorHandler);
app.use(esiHandler);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
