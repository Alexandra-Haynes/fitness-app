import Exercise from "../../models/Exercise"; 
import dbConnect from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  // console.log("this is POST REQUEST");
  // console.log(req.body); ---> error ReadableStream
  let body = await req.json();
  // console.log(body);
  await dbConnect();
  
  try {
    const exercise = await Exercise.create(body);
    return NextResponse.json({ success: true, data: exercise });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
