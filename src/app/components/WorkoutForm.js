'use client'
import React, { useState } from "react";
import Image from "next/image";


const workoutIcons = {
  strength: "/assets/strength.png",
  cardio: "/assets/cardio.png",
  hiit: "/assets/hiit.png",
  walk: "/assets/walking.png",
  run: "/assets/running.png",
  hike: "/assets/hiking.png",
  bike: "/assets/bicycle.png",
  swim: "/assets/swim.png",
  rowing: "/assets/rowing.png",
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
  <Image
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
    { name: "", reps: "", weight: "" },
  ]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("");
  const [calories, setCalories] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [notes, setNotes] = useState("");
  const [distance, setDistance] = useState("");
  const [showNotes, setShowNotes] = useState(false);



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
      distance,
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
    gap-8 text-slate-500 px-4 mx-auto w-fit "
    >
      {/* ____________workout type______________________________- */}
      <div>
        <label className="block w-full mb-2">Workout Type</label>
        <div className="grid grid-cols-3  gap-x-2">
          {Object.keys(workoutIcons).map((workout) => (
            <div
              key={workout}
              onClick={() => setWorkoutType(workout)}
              className={`flex flex-row items-center justify-center gap-2 shadow-sm p-2 border rounded w-[120px] my-1 cursor-pointer ${
                workoutType === workout
                  ? "bg-yellow-200 text-black"
                  : "bg-white/40"
              }`}
            >
              <WorkoutIcon type={workout} /> {workoutNames[workout]}
            </div>
          ))}
        </div>
      </div>

      {/* __________add distance for walk,run,swim,rowing, hike */}

      {["walk", "run", "hike", "bike", "swim", "rowing"].includes(
        workoutType
      ) && (
        <div className="flex flex-row items-center justify-between gap-4">
          <div>
            <label className="block mb-2">Distance</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="p-2 border rounded w-full max-w-[140px]"
              placeholder="mi"
            />
          </div>
          <div className="">
            <label className="block mb-2">Time</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border rounded w-full max-w-[140px]"
              placeholder="min"
            />
          </div>
        </div>
      )}

      {/* ______________ADD exercises____________________ */}

      {!["walk", "run", "swim", "bike", "hike", "rowing"].includes(
        workoutType
      ) && (
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
                className="p-2 border rounded flex-grow
                "
              />
              <input
                type="number"
                placeholder="Reps"
                value={exercise.reps}
                onChange={(e) =>
                  handleExerciseChange(index, "reps", e.target.value)
                }
                className="p-2 border rounded w-20"
              />
              <input
                type="number"
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
            className="px-2 py-1 bg-secondary text-white rounded hover:translate-y-1 hover:shadow-lg shadow-md transition-all ease-in-out"
          >
            + Add
          </button>
        </div>
      )}

      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <label className="block mb-2">Calories</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="p-2 border rounded w-full max-w-[110px]"
            placeholder="cal"
          />
        </div>

        <div>
          <label className="block mb-2">Time</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border rounded w-full max-w-[120px]"
            placeholder="min"
          />
        </div>

        <div>
          <label className="block mb-2">Heart Rate</label>
          <input
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            className="p-2 border rounded w-full max-w-[110px]"
            placeholder="BPM"
          />
        </div>
      </div>

      {/* _____________notes and date_________ */}
      <div className="flex flex-row-reverse items-center justify-center gap-8">
        <div>
          {/* <label className="block ">Notes</label> */}
          <div onClick={() => setShowNotes(!showNotes)} className="mt-6">
            <Image
              src="/assets/notes.png"
              alt="Notes Icon"
              width={36}
              height={36}
            />
          </div>
        </div>

        <div>
          <label className="block ">Date</label>
          <input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]} // Today's date as the maximum value
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border-2 border-highlights rounded-lg
             hover:bg-highlights/20 focus:bg-yellow-200 font-semibold
              active:border-highlights w-[200px] "
          />
        </div>
      </div>

      {showNotes && (
        <div>
          <label className="block mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="p-2 border rounded w-[400px] h-24 resize-none"
            placeholder="About this workout"
          />
        </div>
      )}

      <div>
        <button
          type="submit"
          className="px-8 py-2 bg-primary shadow-md hover:shadow-xl hover:translate-y-1 text-white rounded"
        >
          Submit workout
        </button>
      </div>
    </form>
  );
}

export default WorkoutForm;
