import { Router } from "@oak/oak/router";
import CreateUserRouter from "./create-user-router.ts";
import TokenRouter from "./token-router.ts";
import InitUserRouter from "./init-user-router.ts";

const router = new Router();

router.use(CreateUserRouter.routes());
router.use(TokenRouter.routes());
router.use(InitUserRouter.routes())

export default router;
