import React from "react";
import axios from "axios";

const ExerciseCard = ({ exercise }) => {
  const saveExercise = async () => {
    try {
      const { data } = await axios.post("/api/save-exercise", {
        exercise,
      });
      console.log(data.message); // Exercise saved successfully
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  //steps and target need custom formatting
  const formatSteps = (stepsArray) => {
    return stepsArray.map((step, index) => <li key={index} className="text-[.8rem]">{step}</li>);
  };
  const formatTarget = (targetObject) => {
    const primaryTargets = targetObject.Primary;
    const secondaryTargets = targetObject.Secondary;
    if (secondaryTargets) {
      return `Primary Target: ${primaryTargets}\nSecondary Target: ${secondaryTargets}`;
    } else {
      return `Target: ${primaryTargets}`;
    }
  };

  return (
    <div className=" mt-4 p-12 shadow-xl bg-white/30 rounded-lg">
      <div
        key={exercise.id}
        className="flex flex-col gap-2 items-center justify-center"
      >
        <h3 className="uppercase font-semibold text-md pb-6">
          {exercise.exercise_name}
        </h3>
        <div className="flex md:flex-row flex-col gap-2 items-center justify-between">
          <video
            autoPlay
            mute
            controls
            src={exercise.videoURL}
            className="md:w-1/2 shadow-md rounded-md md:max-w-[600px]"
          ></video>
          <div className="md:w-1/2">
            <p className="self-start pt-4">Steps:</p>{" "}
            <ol>{formatSteps(exercise.steps)}</ol>
          </div>
        </div>
        
        <p>Category: {exercise.Category}</p>
        
        <p>Difficulty: {exercise.Difficulty}</p>
        
        <p>Target muscle:</p>
        <pre>{formatTarget(exercise.target)}</pre>
        
      </div>
      {/* Display exercise details */}
      <button
        onClick={saveExercise}
        className="bg-highlights text-black p-2 rounded-md "
      >
        Save Exercise
      </button>
    </div>
  );
};

export default ExerciseCard;
