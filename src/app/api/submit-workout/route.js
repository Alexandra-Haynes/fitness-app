import Workout from "@/app/models/Workout";
import User from "@/app/models/User";
import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  console.log("this is POST REQUEST");
  // console.log(req.body); ---> error ReadableStream
  let body = await req.json();
  // console.log(body);

  // const { userId, workoutData } = body
  const userId = body.userId;
  const workoutData = body.workoutData;

  try {
    //create workout
    const workout = await Workout.create(workoutData);
    console.log("Received workoutData:", workoutData);

    // log the success message
    console.log(`SUCCESS! Workout with id ${workout._id} added`);
    //add to user's workouts []
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { submittedWorkouts: workout._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, 
        data: workout });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
