import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  Category: { type: String, required: true },
  Difficulty: { type: String, required: true },
  Force: { type: String, },
  Grips: { type: String, },
  exercise_name: { type: String, required: true },
  steps: { type: [String], required: true },
  target: {
    Primary: { type: [String],  },
  },
  videoURL: { type: [String], },
});

export default mongoose.models.Exercise ||
  mongoose.model("Exercise", exerciseSchema, "saved_exercises");
