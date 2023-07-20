import React, { useEffect, useState } from "react";

import { exerciseOptions, fetchData } from "../api/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  if (!currentExercises.length) return <Loader />;

  return (
    <div  className="mt-12 px-12">
      <h4 className="font-semibold text-xl ">
        Search results
      </h4>

      <div className="flex flex-col gap-2 items-center justify-center"> 
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </div>
      <div className="flex items-center ">
        {exercises.length > 9 && (
          <nav>
            <ul className="flex flex-row gap-1 items-center justify-center">
              {[...Array(totalPages)].map((_, idx) => (
                <li key={idx}>
                  <button
                    className={`border border-secondary rounded-full min-w-2 ${
                      currentPage === idx + 1
                        ? "bg-highlights"
                        : "bg-gray-300 text-slate-400"
                    }`}
                    onClick={() => paginate(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Exercises;
