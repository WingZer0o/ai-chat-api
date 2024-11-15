import { Ollama } from "@langchain/ollama";

const llm = new Ollama({
    model: "llama3.1",
    baseUrl: "http://host.docker.internal:11434",
    temperature: 0,
    maxRetries: 2,
});

export default llm;
