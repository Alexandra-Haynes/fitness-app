import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  type: { type: String, required: true },
  exercises: [
    {
      name: { type: String },
      reps: { type: Number },
      weight: { type: Number },
    },
  ],
  date: { type: Date, default: Date.now },
  distance: { type: Number },
  time: { type: Number },
  calories: { type: Number },
  heartRate: { type: Number },
  notes: { type: String },
});

export default mongoose.models.Workout ||
  mongoose.model("Workout", workoutSchema, "workouts");
