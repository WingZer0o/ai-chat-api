// import { ChatOllama } from "npm:@langchain/ollama";
// import { ChatPromptTemplate } from "npm:@langchain/core/prompts";
// import { RecursiveCharacterTextSplitter } from "npm:langchain/text_splitter";
// import { OllamaEmbeddings } from "npm:@langchain/ollama";
// import { MemoryVectorStore } from "npm:langchain/vectorstores/memory";
// import { PDFLoader } from "npm:@langchain/community/document_loaders/fs/pdf";
// import { createStuffDocumentsChain } from "npm:langchain/chains/combine_documents";
// import { createRetrievalChain } from "npm:langchain/chains/retrieval";
// import { createHistoryAwareRetriever } from "npm:langchain/chains/history_aware_retriever";
// import { MessagesPlaceholder } from "npm:@langchain/core/prompts";
// import { HumanMessage, AIMessage } from "npm:@langchain/core/messages";

// const chatModel: ChatOllama = new ChatOllama({
//   baseUrl: "http://localhost:11434", // Default value
//   model: "llama3.1",
// });

// const loader = new PDFLoader("MikeMulchrone_Resume2024.pdf");
// const docs = await loader.load();
// const splitter = new RecursiveCharacterTextSplitter();
// const splitDocs = await splitter.splitDocuments(docs);

// const embeddings = new OllamaEmbeddings({
//   model: "llama3.1",
//   maxConcurrency: 5,
// });

// const vectorstore = await MemoryVectorStore.fromDocuments(
//   splitDocs,
//   embeddings,
// );

// const prompt = ChatPromptTemplate.fromTemplate(
//   `You are a helpful assistant, who always has a smile on her face. Answer the following question based only on the provided context:

// <context>
// {context}
// </context>

// Question: {input}`,
// );

// const documentChain = await createStuffDocumentsChain({
//   llm: chatModel,
//   prompt,
// });
// const retriever = vectorstore.asRetriever();

// const historyAwarePrompt = ChatPromptTemplate.fromMessages([
//   new MessagesPlaceholder("chat_history"),
//   ["user", "{input}"],
//   [
//     "user",
//     "Given the above conversation context, generate a search query to look up in order to get information relevant to the conversation.",
//   ],
// ]);

// const historyAwareRetrieverChain = await createHistoryAwareRetriever({
//   llm: chatModel,
//   retriever,
//   rephrasePrompt: historyAwarePrompt,
// });


// const chatHistory = [
//   new HumanMessage("Was I working in 2020?"),
// ];

// const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
//   [
//     "system",
//     "Answer the user's questions based on the below context:\n\n{context}",
//   ],
//   new MessagesPlaceholder("chat_history"),
//   ["user", "{input}"],
// ]);

// const historyAwareCombineDocsChain = await createStuffDocumentsChain({
//   llm: chatModel,
//   prompt: historyAwareRetrievalPrompt,
// });

// const conversationalRetrievalChain = await createRetrievalChain({
//   retriever: historyAwareRetrieverChain,
//   combineDocsChain: historyAwareCombineDocsChain,
// });

// const result2 = await conversationalRetrievalChain.invoke({
//   chat_history: chatHistory,
//   input: "Tell me where I was working in 2020.",
// });

// console.log(result2.answer);
// chatHistory.push(new AIMessage(result2.answer));

// const results3 = await conversationalRetrievalChain.invoke({
//   chatHistory: chatHistory,
//   input: "Based on your last response, where was I working in March 2020?"
// });

// console.log(results3.answer);