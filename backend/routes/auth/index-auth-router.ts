import { Router } from "@oak/oak/router";
import InitUserRouter from "./init-user-router.ts";

const router = new Router();

router.use(InitUserRouter.routes());

export default router;
