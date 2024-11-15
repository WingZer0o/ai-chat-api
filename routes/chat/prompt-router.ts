import { Ollama } from "@langchain/ollama";
import { Router } from "@oak/oak/router";

const router = new Router();

router.post("/prompt", async (ctx) => {
    const body = await ctx.request.body.json();
    const llm = new Ollama({
        model: "llama3.1",
        baseUrl: "http://host.docker.internal:11434",
        temperature: 0,
        maxRetries: 2,
    });
    const inputText = "Ollama is an AI company that ";
    const completion = await llm.invoke(body.input);
    ctx.response.status = 200;
    ctx.response.body = { message: completion };
});

export default router;
