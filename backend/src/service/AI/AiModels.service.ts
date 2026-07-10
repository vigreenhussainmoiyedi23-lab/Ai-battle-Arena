import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../../config/config.js";

export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  temperature: 0,
  apiKey: config.COHERE_API_KEY,
});

export const geminiModel = new ChatGoogle({
  model: "gemini-3.1-flash-lite",
  maxOutputTokens: 150,
  apiKey: config.GOOGLE_API_KEY,
});

export const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  temperature: 0,
  apiKey: config.MISTRAL_API_KEY,
});
