import { Router } from "@oak/oak/router";

const router = new Router();

router.get("/test", (ctx) => {
    ctx.response.body = "Hello World!";
});

export default router;
