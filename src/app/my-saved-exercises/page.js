"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

function SavedExercises() {
  const { data: session } = useSession();
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    if (session && session.user) {
      let userId = session.user._id;

      try {
        const response = await fetch(`api/saved-exercises/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setExercises(data.data);
      } catch (error) {
        console.error("Error fetching saved exercises:", error);
      }
    }
  };

  fetchExercises();

  return (
    <section className="pt-24 min-h-screen bg-slate-500">
      <div>
        {exercises.map((exercise) => (
          <div key={exercise._id}>
            <h2>{exercise.exercise_name}</h2>
            {/* Render other exercise details here */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SavedExercises;
