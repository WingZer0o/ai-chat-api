import { Router } from "@oak/oak/router";
import { oakCors } from "cors";
import { Application } from "jsr:@oak/oak/application";

const router = new Router();
router.get("/api/testing", (ctx) => {
  ctx.response.body = JSON.stringify(`<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>Hello oak!</h1>
      </body>
    </html>
  `);
});

const app = new Application();
app.use(oakCors({ origin: "http://localhost:4200" }));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
