import { Router } from "@oak/oak/router";
import llm from "../../ollama/ollama-connection.ts";

const router = new Router();

router.post("/prompt", async (ctx) => {
    const body = await ctx.request.body.json();
    const inputText = "Ollama is an AI company that ";
    const completion = await llm.invoke(body.input);
    ctx.response.status = 200;
    ctx.response.body = { message: completion };
});

export default router;
