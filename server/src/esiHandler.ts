// @ts-ignore
import ESI from "nodesi";
import { Context, Next } from "koa";
import { port } from "./config.ts";

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

export async function esiHandler(ctx: Context, next: Next) {
  await next();
  if (ctx.type === "text/html") {
    ctx.body = await esi.process(ctx.body);
  }
}
