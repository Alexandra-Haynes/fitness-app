import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  savedExercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }],

  // progress: {
  //   totalExercisesCompleted: { type: Number, default: 0 },
  //   personalBests: {
  //     benchPress: { type: Number, default: 0 },
  //     mileTime: { type: Number, default: 0 },
  //   },
  //   streaks: {
  //     daysInARow: { type: Number, default: 0 },
  //     bestStreak: { type: Number, default: 0 },
  //   },
  // },
  // badges: [{ type: String, default: [] }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
