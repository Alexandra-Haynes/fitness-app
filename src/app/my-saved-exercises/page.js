"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import SavedExerciseCard from "../components/SavedExerciseCard";
import ExerciseCardsSkeleton from "../components/ExerciseCardsSkeleton";

function SavedExercises() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

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
    pt-12  mx-auto flex flex-col items-center justify-center bg-slate-200"
    >
      <h1 className="font-semibold text-xl py-12">
        {" "}
        Your saved exercises in one place{" "}
      </h1>
      {loading ? (
        // Replace this with your video component or any loading spinner
        // <div className=" flex flex-col items-center justify-center mx-auto h-[300px]">
        //   <p className="text-primary text-xl text-center">Loading ...</p>
        //   <video
        //     src="/assets/loadingIcon.mp4"
        //     autoPlay
        //     muted
        //     className="h-[50px] w-auto"
        //   ></video>
        // </div>
        <div className="w-[300px]">
          <ExerciseCardsSkeleton />
        </div>
      ) : (
        <div className="max-w-[300px] mx-auto">
          {exercises.map((exercise) => (
            <SavedExerciseCard key={exercise._id} exercise={exercise} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedExercises;
