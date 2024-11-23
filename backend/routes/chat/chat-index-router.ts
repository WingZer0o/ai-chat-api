import { Router } from "@oak/oak/router";
import { isAuthorizedMiddleware } from "../../middleware/is-authorized-middleware.ts";
import ChatChannelRouter from "./chat-channel-router.ts";
import PromptRouter from "./prompt-router.ts";

const router = new Router();

router.use(isAuthorizedMiddleware, ChatChannelRouter.routes());
router.use(isAuthorizedMiddleware, PromptRouter.routes());
router.use(isAuthorizedMiddleware, PromptRouter.routes());

export default router;
