import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Add other fields for exercise details
});

export default mongoose.models.Exercise ||
  mongoose.model("Exercise", exerciseSchema);
