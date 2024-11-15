import { Router } from "@oak/oak/router";
import PromptRouter from "./prompt-router.ts";

const router = new Router();

router.use(PromptRouter.routes());

export default router;
