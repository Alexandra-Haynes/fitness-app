import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  Category: { type: String,  },
  Difficulty: { type: String,  },
  Force: { type: String,  },
  Grips: { type: String,  },
  exercise_name: { type: String,  },
  steps: { type: [String],  },
  target: {
    Primary: { type: [String], },
  },
  videoURL: { type: [String] },
});

export default mongoose.models.Exercise ||
  mongoose.model("Exercise", exerciseSchema, "saved_exercises");
