import { Router } from "@oak/oak/router";

import IndexAuthRouter from "./auth/index-auth-router.ts";
import ChatRouter from "./chat/chat-index-router.ts";

const router = new Router();

router.use("/auth", IndexAuthRouter.routes());
router.use("/chat", ChatRouter.routes());

export default router;
