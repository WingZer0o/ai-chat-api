import { Application } from "jsr:@oak/oak/application";
import IndexRouter from "./routes/index-router.ts";

const app = new Application();
app.use(IndexRouter.routes());
app.use(IndexRouter.allowedMethods());

app.listen({ port: 8080 });
