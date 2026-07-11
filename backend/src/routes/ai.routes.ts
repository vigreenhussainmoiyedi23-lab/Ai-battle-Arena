import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { Router } from "express";
import graph from "../services/Ai/Ai.graph.js";
import IsUser from "../middlewares/User.middleware.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { geminiModel } from "../services/Ai/AI.model.js";

const router = Router();

router.post("/invoke-graph", IsUser, async function (req: any, res) {
  const { prompt, chatId } = req.body;
  let chat = chatId || null;
  
  if (!chat) {
    const { content } = await geminiModel.invoke([
      new SystemMessage(`You are a helpful assistant. 
      You will be given a task to solve.
      you will have to give a 2-3 words of topic using the prompt given below`),
      new HumanMessage(`this is the users prompt ${prompt}`),
    ]);
    
    chat = (
      await chatModel.create({
        user: req.user,
        topic: typeof content === "string" ? content : "",
      })
    )._id;
  }
  await messageModel.create({
    user: req.user,
    chat,
    role: "user",
    content: prompt,
  });
  let messages = await messageModel.find({ chat });


  try {
    const result = await graph.invoke({
      messages: messages.map((b) =>
        b.role === "user"
          ? new HumanMessage(b.content)
          : new AIMessage(b.content),
      ),
    });
    console.log("creating messages");
    let preferredByAi = result.judgement.recommendation;
    await messageModel.create({
      user: req.user,
      content: result.solution1,
      chat,
      role: "ai",
      solutionNumber: 1,
      preferredByAi: preferredByAi === "solution1" || preferredByAi === "tie",
    });
    await messageModel.create({
      user: req.user,
      content: result.solution2,
      solutionNumber: 2,
      chat,
      preferredByAi: preferredByAi === "solution2" || preferredByAi === "tie", // opposite of solution1 and in tie solution2 wins
      role: "ai",
    });
    console.log("messages created successfully");

    res.status(200).json({
      ...result,
      chatId: chat,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
