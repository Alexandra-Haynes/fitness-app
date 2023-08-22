'use client'
import React, { useState } from "react";


const workoutIcons = {
  strength: "/assets/strength.png",
  cardio: "/assets/cardio.png",
  walk: "/assets/walking.png",
  run: "/assets/running.png",
  hike: "/assets/hiking.png",
  bike: "/assets/bicycle.png",
  swim: "/assets/swim.png",
  rowing: "/assets/rowing.png",
  hiit: "/assets/hiit.png",
};

const workoutNames = {
  strength: "Strength",
  cardio: "Cardio",
  walk: "Walk",
  run: "Run",
  hike: "Hike",
  bike: "Bike",
  swim: "Swim",
  rowing: "Rowing",
  hiit: "HIIT",
};

const WorkoutIcon = ({ type }) => (
  <img
    src={workoutIcons[type]}
    alt={`${workoutNames[type]} Icon`}
    width={32}
    height={32}
  />
);

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start justify-center
    gap-8 text-slate-500 px-4"
    >
      <div>
        <label className="block mb-2">Date</label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().split("T")[0]} // Today's date as the maximum value
          onChange={(e) => setDate(e.target.value)}
          className="p-3 border-2 border-highlights rounded-lg
             hover:bg-highlights/20 focus:bg-blue-200
              active:border-highlights w-[210px]"
        />
      </div>

      {/* ____________workout type______________________________- */}
      <div>
        <label className="block w-full mb-2">Workout Type</label>
        <div className="grid grid-cols-3">
         { Object.keys(workoutIcons).map((workout) => (
          <div
            key={workout}
            onClick={() => setWorkoutType(workout)}
            className={`flex flex-row items-center justify-center gap-2 p-2 border rounded w-[120px] my-1 cursor-pointer ${
              workoutType === workout ? "bg-yellow-200 text-black" : ""
            }`}
          >
            <WorkoutIcon type={workout} /> {workoutNames[workout]}
          </div>
          ))}
        </div>
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
          className="px-2 py-1 bg-secondary
           text-white rounded hover:translate-y-1 hover:shadow-lg shadow-md transition-all ease-in-out"
        >
          + Add Exercise
        </button>
      </div>

      <div className="flex flex-row items-center justify-between gap-4">
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
      </div>

      <div>
        <label className="block mb-2">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="p-2 border rounded w-[400px] h-24 resize-none" // Added `resize-none` to disable resizing
          placeholder="About this workout"
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary shadow-md hover:shadow-xl hover:translate-y-1 text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
