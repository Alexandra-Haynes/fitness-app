import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  // savedExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
