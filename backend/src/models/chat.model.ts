import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    topic: { type: String, default: `${Date.now().toLocaleString()}` },
  },
  {
    timestamps: true,
  },
);


const chatModel = mongoose.model("chat", chatSchema);


export default chatModel;
