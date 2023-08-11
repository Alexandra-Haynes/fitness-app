import Exercise from "../../models/Exercise"; 
import User from "@/app/models/User";
import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();


  console.log("this is POST REQUEST");
  // console.log(req.body); ---> error ReadableStream
  let body = await req.json();
  // console.log(body);

  // const { userId, exerciseData } = body
  const userId = body.userId
  const exerciseData = body.exercise

  try {
    //create exercise
    const exercise = await Exercise.create(exerciseData);
    // console.log("Received exerciseData:", exerciseData);

    // log the success message
    console.log(`SUCCESS! Exercise with id ${exercise._id} added`);
    //add to user's savedExercise []
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { savedExercises: exercise._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return NextResponse.json({ success: true, data: exercise });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
