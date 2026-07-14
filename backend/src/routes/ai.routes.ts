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
import mongoose from "mongoose";

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

  let messages: { role: string; content: string; isCurrent: boolean }[] =
    await messageModel.find({
      chat,
    });
  messages.push({ role: "user", content: prompt, isCurrent: true });

  try {
    const result = await graph.invoke({
      messages: messages.map((b) =>
        b.role === "user"
          ? new HumanMessage(b.content)
          : new AIMessage(b.content),
      ),
    });
    let preferredByAi = result.judgement.recommendation;
    await messageModel.create({
      user: req.user,
      chat,
      role: "user",
      content: prompt,
      solutionsByAIs: {
        solution1: result.solution1,
        solution2: result.solution2,
      },
      preferredByUser: null,
      preferredByAi:
        preferredByAi === "1" ? 1 : preferredByAi === "2" ? 2 : null,
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
router.get("/get-chats", IsUser, async (req: any, res) => {
  const chats = await chatModel.find({ user: req.user });
  console.log(chats);
  res.status(200).json({ chats });
});
router.get("/get-messages/:chatId", IsUser, async (req: any, res) => {
  try {
    const {chatId}=req.params
    if(!chatId || !mongoose.Types.ObjectId.isValid(chatId)){
      return res.status(400).json({ error: "Invalid chatId" });
    }
    const chats = await messageModel.find({
      user: req.user,
      chat: req.params.chatId,
    });
    console.log(chats);
    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({ error });
  }
});
export default router;
