import { HumanMessage } from "@langchain/core/messages";
import { Router } from "express";
import graph from "../services/Ai/Ai.graph.js";

const router = Router();

router.post("/invoke-graph", async function (req, res) {
  const { prompt } = req.body;
  const result = await graph.invoke({
    messages: [new HumanMessage(prompt!)],
  });
  res.json(result);
});

export default router;
