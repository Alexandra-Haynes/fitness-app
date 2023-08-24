import dbConnect from "../../../lib/db";
import { NextResponse } from "next/server";
import Workout from "../../../models/Workout";
import User from "../../../models/User";

export async function GET(req, { params }) {
  await dbConnect();
  // console.log("this is GET");
  const userId = params.userId;

  try {
    const user = await User.findOne({ _id: userId });
    // console.log("User found in db");
    if (!user) throw new Error("User not found");

    const submittedWorkoutsIds = user.submittedWorkouts;

    const workouts = await Workout.find({ _id: { $in: submittedWorkoutsIds } });

    return NextResponse.json({ success: true, data: workouts });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
