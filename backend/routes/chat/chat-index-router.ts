import { Router } from "@oak/oak/router";
import { authourized } from "../../middleware/is-authorized-middleware.ts";
import PromptRouter from "./prompt-router.ts";

const router = new Router();

router.use(authourized, PromptRouter.routes());

export default router;
