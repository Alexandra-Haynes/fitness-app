import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  type: { type: String, required: true },
  exercises: [
    {
      name: { type: String, required: true },
      reps: { type: Number },
    },
  ],
  date: { type: Date, default: Date.now },
  time: { type: String },
  calories: { type: Number },
  heartRate: { type: Number },
  notes: { type: String },
});

export default mongoose.models.Workout ||
  mongoose.model("Workout", workoutSchema, "workouts");
