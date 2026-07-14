import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat", required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    solutionsByAIs: {
      solution1: {
        type: String,
        required: true,
      },
      solution2: {
        type: String,
        required: true,
      },
    },
    preferredByUser: {
      type: Number,
      default: null, // means no prefrence
      enum: [1, 2],
    },
    preferredByAi: {
      type: Number,
      default: null, // means tie
      enum: [1, 2],
    },
  },
  {
    timestamps: true,
  },
);

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
