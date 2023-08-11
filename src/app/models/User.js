import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatarPath: { type: String, default: "default-avatar.png" }, // Default avatar URL

  savedExercises: [{ type: mongoose.Schema.Types.ObjectId,
     ref: "Exercise" }], //only add the reference of the exercise
});

export default mongoose.models.User || mongoose.model("User", userSchema);
