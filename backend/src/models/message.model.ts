import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat", required: true },
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
      default: 0, // means no prefrence
      enum: [1, 2, 0],
    },
    preferredByAi: {
      type: Number,
      default: 0, // means tie
      enum: [1, 2, 0],
    },
    solutionScore: {
      solution1Score: {
        type: Number,
        minimum: 0,
        maximum: 10,
      },
      solution2Score: {
        type: Number,
        minimum: 0,
        maximum: 10,
      },
    },
  },
  {
    timestamps: true,
  },
);

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
