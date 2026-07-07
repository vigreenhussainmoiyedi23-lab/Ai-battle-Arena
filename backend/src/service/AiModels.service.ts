import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";


export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  temperature: 0,
});

export const geminiModel = new ChatGoogle("gemini-flash-latest");

export const mistralModel = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0,
});
