import express from "express";
import graph from "./service/graph.ai.service.js";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import morgan from "morgan";
const messages: [] = [];
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/invoke-graph", async (req, res) => {
  if (!req.body.prompt || typeof req.body.prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }
  messages.push(new HumanMessage(req.body.prompt));
  const response = await graph.invoke({
    messages: messages,
  });
  messages.push(new AIMessage(response.solution_1));
  messages.push(new AIMessage(response.solution_2));
  
  res.json(response);
});

export default app;
