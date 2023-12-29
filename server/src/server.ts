import Koa from "koa";
import { errorHandler } from "./errorHandler.ts";
import { esiHandler } from "./esiHandler.ts";
import { port } from "./config.ts";
import { router } from "./routes.ts";

const app = new Koa();

app.use(errorHandler);
app.use(esiHandler);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
