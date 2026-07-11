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
  },
  {
    timestamps: true,
  },
);

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
