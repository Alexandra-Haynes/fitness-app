'use client'

import React, { useState } from "react";
import axios from "axios";

const ExerciseSearch = () => {
  const [searchText, setSearchText] = useState(""); 

  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the selected options
    const searchOptions = {
      type,
      difficulty,
      exercise_name: searchText,
    };

    axios
      .post("https://musclewiki.p.rapidapi.com/exercises/v1/exercises", {
        params: searchOptions,
        headers: {
          "X-RapidAPI-Key":
            "e119a0a4ecmsh9f0e8682c769d3ap16d415jsn9bda5349b4fe",
          "X-RapidAPI-Host": "musclewiki.p.rapidapi.com",
        },
      })
      .then((response) => response.json())
      .then((response) => {
        const filteredExercises = response.data.filter((exercise) =>
          exercise.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setExercises(filteredExercises);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleExerciseDetails = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <section className="h-screen bg-hero bg-center bg-cover flex flex-col items-center justify-center">
      <div className="bg-white/90 w-[90%] h-[80%] rounded p-12">
        <form onSubmit={handleSubmit}>
          {/* Exercise Type */}
          <h1 className="font-semibold uppercase text-center pb-12 text-2xl">
            Choose your workout
          </h1>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              1. Search by exercise name
            </label>
            <input
              type="text"
              className="block w-full bg-white border border-gray-300 
              text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none 
              focus:bg-white focus:border-gray-500"
              placeholder="Exercise name..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              1. Select your today's workout
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 
              text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none 
              focus:bg-white focus:border-gray-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="body">Strength</option>
              <option value="stretching">Stretching</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="plyometrics">Plyometrics</option>
              <option value="olympic_weightlifting">
                Olympic weightlifting
              </option>
              <option value="strongman">Strongman</option>
            </select>
          </div>

          {/* Exercise Difficulty */}
          <div className="mb-4 flex flex-row gap-2 items-center justify-center">
            <label className="font-semibold">Difficulty: </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="difficulty"
                value="beginner"
                className="form-radio h-5 w-9"
                checked={difficulty === "beginner"}
                onChange={() => setDifficulty("beginner")}
              />
              <span className="ml-2">Beginner</span>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="difficulty"
                value="intermediate"
                className="form-radio h-5 w-9 "
                checked={difficulty === "intermediate"}
                onChange={() => setDifficulty("intermediate")}
              />
              <span className="ml-2">Intermediate</span>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="difficulty"
                value="expert"
                className="form-radio h-5 w-9 "
                checked={difficulty === "expert"}
                onChange={() => setDifficulty("expert")}
              />
              <span className="ml-2">Expert</span>
            </div>
          </div>

          <button
            type="submit"
            className="bg-secondary text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </form>

        {/* _____________________RESULTS */}
        <div>
          {exercises.map((exercise) => (
            <div key={exercise.id}>
              <h3>Name: {exercise.name}</h3>
              <p>Muscle: {exercise.muscle}</p>
              <p>Equipment: {exercise.equipment}</p>

              {/* Add a button to view exercise details */}
              <button
                className="bg-secondary text-white font-bold py-2 px-4 rounded mt-2"
                onClick={() => handleExerciseDetails(exercise)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Display selected exercise details */}
        {selectedExercise && (
          <div>
            <h3>Name: {selectedExercise.name}</h3>
            <p>Muscle: {selectedExercise.muscle}</p>
            <p>Equipment: {selectedExercise.equipment}</p>
            <p>Category: {selectedExercise.category}</p>
            <p>Difficulty: {selectedExercise.difficulty}</p>
            <p>Force: {selectedExercise.force}</p>
            <p>Details: {selectedExercise.details}</p>
            <p>Video 1: {selectedExercise.videoURL[0]}</p>
            <p>Video 2: {selectedExercise.videoURL[1]}</p>
            <p>Steps: {selectedExercise.steps}</p>

            {/* Add a button to close exercise details */}
            <button
              className="bg-secondary text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => setSelectedExercise(null)}
            >
              Close Details
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExerciseSearch;
