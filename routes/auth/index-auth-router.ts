import { Router } from "@oak/oak/router";
import { Argon2Wrapper } from "npm:cas-typescript-sdk";

const router = new Router();

router.post("/test", async (ctx) => {
    const body = await ctx.request.body.json();
    ctx.response.body = await new Argon2Wrapper().hashPassword(body.welcome);
});

export default router;
