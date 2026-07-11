import { HumanMessage } from "@langchain/core/messages";
import { Router } from "express";
import graph from "../services/Ai/Ai.graph.js";
import IsUser from "../middlewares/User.middleware.js";

const router = Router();

router.post("/invoke-graph", IsUser, async function (req, res) {
  const { prompt } = req.body;

  try {
    const result = await graph.invoke({
      messages: [new HumanMessage(prompt!)],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
