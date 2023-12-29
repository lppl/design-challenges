import { Context, Next } from "koa";
import { sendMessage } from "./formatters.ts";

export const enum StatusCode {
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpError extends Error {
  constructor(
    readonly status: StatusCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err: any) {
    const status = Number(err?.statusCode || err?.status || 500);
    const message = String(err?.message || "Internal Server Error");
    sendMessage(ctx, status, message);
    ctx.app.emit("error", err, ctx);
  }
}
