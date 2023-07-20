'use client'

import React, { useState } from "react";

import Exercises from "../components/Exercises";
import SearchExercises from "../components/SearchExercises";
import Navbar from "../components/Navbar";


const ExploreExercises = () => {
     const [exercises, setExercises] = useState([]);
     const [bodyPart, setBodyPart] = useState("all");
  return (
    <div className=" bg-primary ">
      <Navbar />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
      />
    </div>
  );
}

export default ExploreExercises
