// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  authId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
