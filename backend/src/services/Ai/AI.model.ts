import { ChatCohere } from "@langchain/cohere";
import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import config from "../../configs/config.js";

const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: config.COHERE_API_KEY,
});

const geminiModel = new ChatGoogle({
  model: "gemini-3-flash-preview",
  apiKey: config.GOOGLE_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "ministral-3b-latest",
  temperature: 0,
  apiKey: config.MISTRAL_API_KEY,
});

export { cohereModel, geminiModel, mistralModel };
