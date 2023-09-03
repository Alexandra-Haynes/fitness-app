"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import SavedExerciseCard from "../components/SavedExerciseCard";
import ExerciseCardsSkeleton from "../components/ExerciseCardsSkeleton";
import NotLoggedIn from "../components/NotLoggedIn";

function SavedExercises() {
  const { data: session } = useSession();
  const isAuthenticated = session?.user;
  const [loading, setLoading] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [isCreatingWorkout, setIsCreatingWorkout] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const fetchExercises = async () => {
    if (session && session.user) {
      let userId = session.user._id;
      setLoading(true);
      try {
        const response = await fetch(`api/saved-exercises/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setExercises(data.data);
        // console.log(exercises)
      } catch (error) {
        console.error("Error fetching saved exercises:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    //only fetch once when the session changes, not every render
    fetchExercises();
  }, [session]);

  return (
    <section
      className="relative min-h-screen h-fit md:w-[80%] 
    pt-12  mx-auto flex flex-col items-center justify-start "
    >
      <h1
        className="mt-24 mb-12 w-full text-3xl font-light text-center 
          text-gray-800 uppercase "
      >
        {" "}
        Saved exercises{" "}
      </h1>

      {isAuthenticated ? (
        loading ? (
          <div className="w-[300px]">
            <ExerciseCardsSkeleton />
          </div>
        ) : (
          <>
            {exercises.length === 0 ? (
              <p className="text-slate-500 py-4">
                You haven't saved any exercises yet.{" "}
                <Link
                  href="/explore-exercises"
                  className="bg-highlights py-1 px-4 rounded-full text-white
                shadow-md"
                >
                  Explore exercises
                </Link>
              </p>
            ) : (
              <div className="max-w-[380px] mx-auto mb-24">
                {exercises.map((exercise) => (
                  <SavedExerciseCard
                    key={exercise._id}
                    exercise={exercise}
                    onClick={() => {
                      if (isCreatingWorkout) {
                        setSelectedExercises([...selectedExercises, exercise]);
                      }
                    }}
                  />
                ))}
              </div>
            )}
            <button
              className="bg-highlights py-2 px-4 rounded-full text-white shadow-md"
              onClick={() => {
                setIsCreatingWorkout(true);
              }}
            >
              Create Workout
            </button>

            {isCreatingWorkout && (
              <div className="selected-exercises">
                <h2>Selected Exercises:</h2>
                <ul>
                  {selectedExercises.map((exercise) => (
                    <li key={exercise._id}>
                      <strong>{exercise.name}</strong>
                      <p>Equipment needed: {exercise.equipment.join(", ")}</p>
                      <p>Muscles targeted: {exercise.target.join(", ")}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )
      ) : (
        <NotLoggedIn />
      )}
    </section>
  );
}

export default SavedExercises;
