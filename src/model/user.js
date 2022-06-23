import mongoose from "../lib/db.js";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, default: null, required: true},
  username: { type: String, required: true, unique: true, required: true},
  password: { type: String, required: true, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
});

export default model("User", userSchema);
