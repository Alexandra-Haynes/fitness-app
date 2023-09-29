"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {TiDelete} from 'react-icons/ti'

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

  const fetchExercises =  useCallback(async () => {
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
  }, [session]);

  useEffect(() => {
    //only fetch once when the session changes, not every render
    fetchExercises();
  }, [fetchExercises]);

  const handleAddToWorkout = (exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  const uniqueCategories = [];
  const uniqueMuscles = [];

  selectedExercises.forEach((exercise) => {
    if (exercise.Category && !uniqueCategories.includes(exercise.Category)) {
      uniqueCategories.push(exercise.Category);
    }

    if (
      exercise.target &&
      exercise.target.Primary[0] &&
      !uniqueMuscles.includes(exercise.target.Primary[0])
    ) {
      uniqueMuscles.push(exercise.target.Primary[0]);
    }
  });
    const formatTarget = (targetObject) => {
      const primaryTargets = targetObject.Primary[0];
      const secondaryTargets = targetObject.Secondary;

      return primaryTargets;
    };
    const handleDeleteExercise = (exerciseToDelete) => {
      const updatedExercises = selectedExercises.filter(
        (exercise) => exercise._id !== exerciseToDelete._id
      );
      setSelectedExercises(updatedExercises);
    };

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
                You haven&apos;t saved any exercises yet.{" "}
                <Link
                  href="/explore-exercises"
                  className="bg-highlights py-1 px-4 rounded-full text-white
                shadow-md"
                >
                  Explore exercises
                </Link>
              </p>
            ) : (
              <div className="max-w-[380px] mx-auto mb-6">
                {exercises.map((exercise) => (
                  <SavedExerciseCard
                    key={exercise._id}
                    exercise={exercise}
                    onAddToWorkout={handleAddToWorkout}
                    onDeleteExercise={handleDeleteExercise}
                    showAddIcon={isCreatingWorkout}
                  />
                ))}
              </div>
            )}
            <button
              className="bg-highlights py-2 px-4 rounded-full
               text-white shadow-md"
              onClick={() => {
                setIsCreatingWorkout(true);
              }}
            >
              Create Workout
            </button>

            {isCreatingWorkout && (
              <div className="bg-slate-100 w-[400px] mb-6 p-4 rounded-sm shadow-md my-6 ">
                <ul>
                  {selectedExercises.map((exercise) => (
                    <li
                      key={exercise._id}
                      className="p-2 border mb-2 bg-white/30"
                    >
                      <div className="flex flex-row items-center justify-between">
                        <strong className="px-2">
                          {exercise.exercise_name}
                        </strong>
                        <div className="flex flex-row gap-1 items-center justify-center">
                          <Image
                            src={`/assets/categories/${exercise.Category.toLowerCase()}.png`}
                            height={36}
                            width={36}
                            title={`Category: ${exercise.Category}`}
                            alt={exercise.Category}
                            className="opacity-80"
                          />
                          <Image
                            src={`/assets/muscles/${formatTarget(
                              exercise.target
                            )}.png`}
                            height={40}
                            width={40}
                            title={`Target muscle: ${formatTarget(
                              exercise.target
                            )}`}
                            alt={exercise.title}
                            className="drop-shadow-2xl min-h-[20px] min-w-[20px]"
                          />
                          <button
                            className="text-slate-500 hover:text-red-500 hover:scale-110"
                            onClick={() => handleDeleteExercise(exercise)}
                          >
                            <TiDelete />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 pl-4">
                  <p>
                    <span className="font-semibold pr-2">Total</span>
                    {selectedExercises.length} exercises
                  </p>
                  <p>
                    <span className="font-semibold pr-2">
                      Equipment needed:
                    </span>{" "}
                    {uniqueCategories.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold pr-2">
                      Targeted muscles:
                    </span>
                    {uniqueMuscles.join(", ")}
                  </p>
                </div>
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
