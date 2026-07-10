import express from "express";
import graph from "./service/AI/graph.ai.service.js";
import {
  AIMessage,
  HumanMessage,
  type BaseMessage,
} from "@langchain/core/messages";
import morgan from "morgan";
import { MessagesValue } from "@langchain/langgraph";
const messages: BaseMessage[] = [];
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/invoke-graph", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || (typeof prompt !== "string" && typeof prompt !== "object")) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  messages.push(new HumanMessage(prompt));
  const response = await graph.invoke({
    messages: messages,
  });
  // in a tie we send the second solution as mistral is better
  if (response.judgement.recommendation === "solution_1")
    messages.push(new AIMessage(response.solution_1));
  else messages.push(new AIMessage(response.solution_2));

  res.json(response);
});

export default app;
