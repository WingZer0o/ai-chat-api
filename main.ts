import { oakCors } from "cors";
import { Application } from "jsr:@oak/oak/application";
import IndexRouter from "./routes/index-router.ts";

const app = new Application();
app.use(oakCors({ origin: "http://localhost:4200" }));
app.use(IndexRouter.routes());

app.listen({ port: 8080 });
