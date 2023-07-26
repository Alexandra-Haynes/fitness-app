// pages/api/save-exercise.js
import { getSession } from "next-auth/react";
import dbConnect from "../lib/db";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { exercise } = req.body; // Assuming the exercise data is sent in the request body

  if (!exercise) {
    return res.status(400).json({ error: "Exercise data is required" });
  }

  try {
    
    dbConnect()

    
    await db
      .collection("users")
      .updateOne({ _id: session.user.id }, { $push: { exercises: exercise } });

    res.status(200).json({ message: "Exercise saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save exercise" });
  }
}
