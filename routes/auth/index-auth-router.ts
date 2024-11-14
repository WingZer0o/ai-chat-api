import { Router } from "@oak/oak/router";
import CreateUserRouter from "./create-user-router.ts";
import TokenRouter from "./token-router.ts";

const router = new Router();

router.use(CreateUserRouter.routes());
router.use(TokenRouter.routes());

export default router;
