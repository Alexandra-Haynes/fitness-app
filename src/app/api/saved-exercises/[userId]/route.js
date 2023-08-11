import dbConnect from "../../../lib/db";
import { NextResponse } from "next/server";
import Exercise from "../../../models/Exercise";
import User from "../../../models/User";

export async function GET(req, { params }) {
  await dbConnect();
  // console.log("this is GET");
  const userId = params.userId;

  try {
    const user = await User.findOne({ _id: userId });
    // console.log("User found in db");
    if (!user) throw new Error("User not found");

    const savedExerciseIds = user.savedExercises;

    const exercises = await Exercise.find({ _id: { $in: savedExerciseIds } });

    return NextResponse.json({ success: true, data: exercises });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
