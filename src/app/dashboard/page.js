"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import WorkoutCard from "../components/WorkoutCard";
import LoadingGif from "../components/LoadingGif";

const Dashboard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
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
        console.log(workouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    //only fetch once when the session changes, not every render
    fetchWorkouts();
  }, [session]);
  return (
    <section
      className="min-h-screen h-fit bg-slate-200
    w-screen flex flex-col items-center justify-center pt-24"
    >
      <h1> Dashboard</h1>
      {loading ? (<LoadingGif />):
      (
        <div className="">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.key} workout = {workout} />
         
          ))}
        </div>
      )
      
    
    }



    </section>
  );
};

export default Dashboard;
