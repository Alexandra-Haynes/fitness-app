'use client'

import React, {useState, useEffect} from "react";

import {  useRouter } from 'next/navigation'; 


// import Exercises from "../app/components/Exercises";
// import SearchExercises from "../app/components/SearchExercises";
import LoadingPage from "./components/LoadingPage";
import HeroBanner from "../app/components/HeroBanner";
import Navbar from "../app/components/Navbar";
import Footer from "./components/Footer";

const Home = () => {
   const router = useRouter();
     const [isLoading, setIsLoading] = useState(true);


     //delay home page
       useEffect(() => {
         const delay = setTimeout(() => {
           setIsLoading(false);
         }, 1200);
         return () => clearTimeout(delay); // Clear the timeout to avoid memory leaks
       }, []);

  // const [exercises, setExercises] = useState([]);
  // const [bodyPart, setBodyPart] = useState("all");
  const navigateToExercises = () => {
    router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className=" bg-slate-700 h-screen overflow-x-hidden">
            <div className=" absolute bg-hero opacity-20 w-full h-full
             overflow-hidden bg-cover bg-center">
             
            </div>

            <Navbar />

            <HeroBanner navigateToExercises={navigateToExercises} />
            {/* <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
      /> */}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
