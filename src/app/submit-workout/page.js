"use client";
import React, {useState} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import WorkoutForm from "../components/WorkoutForm";

function SubmitWorkout() {
  const { data: session } = useSession();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmitWorkout = async (workoutData) => {
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

          setSuccessMessage("Workout successfully saved!");
          //clear popup after 2sec
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        } else if (response.status) {
          console.log(`Server responded with status code: ${response.status}`);

          setSuccessMessage("Workout saved!");
          //clear popup after 2sec
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        }
      } catch (error) {
        console.error("Error submitting workout:", error);
      }
    }
  };

  return (
    <section className="min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl mb-6">Submit a Workout</h1>
        <WorkoutForm onSubmit={handleSubmitWorkout} />
      </div>
      {/* _________________Message popup workout submitted_______________ */}

      <div className="bg-white absolute -top-12 right-0 animate-slide-in-left">
        {successMessage && (
          <div className="p-2  text-green-500">{successMessage}</div>
        )}
      </div>
    </section>
  );
}

export default SubmitWorkout;
