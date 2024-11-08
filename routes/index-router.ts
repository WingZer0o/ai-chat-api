import { Router } from "@oak/oak/router";

import IndexAuthRouter from "./auth/index-auth-router.ts";

const router = new Router();

router.use("/auth", IndexAuthRouter.routes());

export default router;
