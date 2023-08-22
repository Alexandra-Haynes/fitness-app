"use client";
import React, {useState} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import WorkoutForm from "../components/WorkoutForm";

function SubmitWorkout() {
  const { data: session } = useSession();
  const [successMessage, setSuccessMessage] = useState(false);



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

          setSuccessMessage(true);
          setTimeout(() => {
            setSuccessMessage(false);
          }, 3000);
       
        } else if (response.status) {
          console.log(`Server responded with status code: ${response.status}`);

         
        }
      } catch (error) {
        console.error("Error submitting workout:", error);
      }
    }
  };


  return (
    <section className="min-h-screen h-fit pt-12 bg-slate-100
    w-screen flex flex-col items-center justify-center ">
      <div className="p-6">
        {/* <h1 className="text-2xl mb-6">Congratulations</h1> */}
        <WorkoutForm onSubmit={handleSubmitWorkout} />
      </div>
      {/* _________________Message popup workout submitted_______________ */}

      {successMessage && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-primary/50  flex flex-col 
        items-center justify-center z-50"
        >
          <div
            className="fixed h-48 py-12 left-0 w-full  bg-highlights flex flex-col 
        items-center justify-center z-50"
          >
            <p className="text-2xl mb-6">Workout submitted!</p>
            <p className="mb-4">
              Your workout will be available in the account page.
            </p>
          
          </div>
        </div>
      )}
    </section>
  );
}

export default SubmitWorkout;
