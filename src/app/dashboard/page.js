"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, useCallback } from "react";
import WorkoutCard from "../components/WorkoutCard";
import LoadingGif from "../components/LoadingGif";

const Dashboard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = useCallback(async () => {
    if (session && session.user) {
      let userId = session.user._id;
      setLoading(true);
      try {
        const response = await fetch(`api/submitted-workouts/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWorkouts(data.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [session]);

  // This effect logs the workouts whenever they change

  useEffect(() => {
    if (workouts.length > 0) {
      console.log(workouts);
    }
  }, [workouts]);

  // This effect fetches workouts initially when the component is mounted
  // and whenever fetchWorkouts changes

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  /*
Why I use useCallback - Vercel deployment error:
This way, fetchWorkouts will only be recreated when session changes, 
and useEffect will only run when fetchWorkouts is recreated, effectively 
still tying it to changes in session but in a way that satisfies 
the rules of hooks.
*/

  return (
    <section
      className="min-h-screen h-fit bg-slate-200
    w-screen flex flex-col items-center justify-center pt-24"
    >
      <h1> Dashboard</h1>
      {loading ? (
        <LoadingGif />
      ) : (
        <div className="">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.key} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
