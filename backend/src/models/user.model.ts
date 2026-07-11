import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String, select: false },
  tokens: { type: Number, default: 1000 },
});
userSchema.index({ username: 1, email: 1 });

const userModel = mongoose.model("user", userSchema);

export default userModel;
