'use client'
import React, { useState } from "react";

function WorkoutForm({ onSubmit }) {
  const [workoutType, setWorkoutType] = useState("strength");
  const [exercises, setExercises] = useState([
    { name: "", reps: "", weight: "" },
  ]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [notes, setNotes] = useState("");

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workoutData = {
      type: workoutType,
      exercises: exercises,
      date,
      time,
      calories,
      heartRate,
      notes,
    };
    onSubmit(workoutData);
    // Reset form for future use
    setExercises([]);
    setTime("");
    setCalories("");
    setHeartRate("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        <label className="block mb-2">Workout Type</label>
        <select
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="run">Run</option>
          <option value="walk">Walk</option>
          <option value="swim">Swim</option>
          {/* Add more types if needed */}
        </select>
      </div>

      {/* ______________ADD exercises____________________ */}
      <div>
        <label className="block mb-2">Exercises</label>
        {exercises.map((exercise, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Exercise Name"
              value={exercise.name}
              onChange={(e) =>
                handleExerciseChange(index, "name", e.target.value)
              }
              className="p-2 border rounded flex-grow"
            />
            <input
              type="text"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) =>
                handleExerciseChange(index, "reps", e.target.value)
              }
              className="p-2 border rounded w-20"
            />
            <input
              type="text"
              placeholder="Weight"
              value={exercise.weight}
              onChange={(e) =>
                handleExerciseChange(index, "weight", e.target.value)
              }
              className="p-2 border rounded w-20"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setExercises([...exercises, { name: "", reps: "", weight: "" }])
          }
          className="px-2 py-1 bg-gray-200 rounded"
        >
          + Add Exercise
        </button>
      </div>

      <div>
        <label className="block mb-2">Calories Burned</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter calories burned"
        />
      </div>

      <div>
        <label className="block mb-2">Heart Rate</label>
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter heart rate"
        />
      </div>

      <div>
        <label className="block mb-2">Add any additional notes</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="About this workout"
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
