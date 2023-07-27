import dbConnect from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { exercise } = req.body;

    // Save the exercise to the database
    const { db } = await dbConnect();
    const collection = db.collection("saved_exercises");
    const result = await collection.insertOne(exercise);

    if (result.insertedCount === 1) {
      return res.status(200).json({ message: "Exercise saved successfully" });
    } else {
      return res.status(500).json({ message: "Failed to save exercise" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error saving exercise", error });
  }
}
