import * as felixArgon from "@felix/argon2";
import { Router } from "@oak/oak/router";

const router = new Router();

router.post("/test", async (ctx) => {
    const body = await ctx.request.body.json();
    ctx.response.body = await felixArgon.hash(body.welcome);
});

export default router;
