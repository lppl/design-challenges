import Koa from "koa";
import { errorHandler } from "./errorHandler.ts";
import { esiHandler } from "./esiHandler.ts";
import { port } from "./config.ts";
import { router } from "./routes.ts";
import serve from "koa-static";
import path from "path";

const app = new Koa();

app.use(errorHandler);
app.use(esiHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(path.resolve(__dirname + "/../..")));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
