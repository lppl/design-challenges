import { Context } from "koa";
import { compileFile } from "pug";
import path from "path";
import { HttpError, StatusCode } from "./errorHandler.ts";

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

export function sendMessage(ctx: Context, status: number, message: string) {
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
  const template = ctx.template || ctx.query.template || ctx.request.query.template;
  if (typeof template === "string") {
    return template;
  } else if (Array.isArray(template)) {
    return template[0];
  } else {
    return undefined;
  }
}

export function sendData(ctx: Context, status: number, data: unknown) {
  const render = getRenderer(getTemplate(ctx));
  if (render) {
    sendHTML(ctx, status, render(data || {}));
  } else {
    sendJson(ctx, status, data);
  }
}
