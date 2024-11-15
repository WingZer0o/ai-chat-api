import { Ollama } from "@langchain/ollama";

const llm = new Ollama({
    model: Deno.env.get("OLLAMA_MODEL"),
    baseUrl: Deno.env.get("OLLAMA_URL"),
    temperature: 0,
    maxRetries: 2,
});

export default llm;
