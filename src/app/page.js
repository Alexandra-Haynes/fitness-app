'use client'


import React, { useState } from "react";



// import Exercises from "../app/components/Exercises";
// import SearchExercises from "../app/components/SearchExercises";
import HeroBanner from "../app/components/HeroBanner";
import Navbar from "../app/components/Navbar";

const Home = () => {
  // const [exercises, setExercises] = useState([]);
  // const [bodyPart, setBodyPart] = useState("all");

  return (
    <div className="bg-primary h-screen overflow-x-hidden">
      <Navbar/>
    
      <HeroBanner />
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
  );
};

export default Home;
