"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import WorkoutForm from "../components/WorkoutForm";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SubmitWorkout() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmitWorkout = async (workoutData) => {
    setIsLoading(true);
    if (session && session.user) {
      let userId = session.user._id;

      const postData = {
        userId,
        workoutData,
      };

      try {
        const response = await axios.post("/api/submit-workout", postData);
        if (response.data && response.data.message) {
          console.log(response.data.message);
          setSuccessMessage(true);
        } else if (response.status) {
          console.log(`Server responded with status code: ${response.status}`);
        }
      } catch (error) {
        console.error("Error submitting workout:", error);
      } finally {
        setIsLoading(false);
        setSuccessMessage(true)
      }
    }
  };

  return (
    <section
      className="min-h-screen h-fit pt-12 bg-slate-100
    w-screen flex flex-col items-center justify-center "
    >
      <div className="p-6">
        <WorkoutForm onSubmit={handleSubmitWorkout} />
      </div>

      {/* ___________________loading_______________ */}

      {isLoading && (
        <div className="fixed top-1/2 left-1/2 animate-pulse transform -translate-x-1/2 -translate-y-1/2">
          <AiOutlineLoading3Quarters className="text-3xl text-secondary animate-spin" />
        </div>
      )}

      {/* _________________Message popup workout submitted_______________ */}

      {successMessage && (
        <div
          className="grid grid-cols-2 fixed h-20 py-8 right-0 top-20 w-1/2 
            max-w-[300px]  bg-highlights/70  z-50 rounded-l-lg shadow-lg
            justify-items-center content-center pl-6 whitespace-nowrap"
        >
          <div
            className="flex flex-col 
        items-center justify-center"
          >
            <p className="text-sm mb-2">Workout submitted!</p>
            <Link href="/dashboard">
              <button
                className="bg-white/70 text-sm px-4 py-1 rounded-full
               hover:bg-white/90 transition-all ease-in-out"
              >
                See workouts
              </button>
            </Link>
          </div>
          <Image
            src="/assets/tracking-app.png"
            width={50}
            height={50}
            alt="tracking app icon"
          />
          <button
            onClick={() => setSuccessMessage(false)}
            className="absolute top-1 right-1 hover:bg-white/50 
         rounded-full focus:outline-none transition-all ease-in-out"
          >
            <Image
              src="/assets/closeIcon.png"
              width={24}
              height={24}
              alt="close icon"
            />
          </button>
        </div>
      )}
    </section>
  );
}

export default SubmitWorkout;
