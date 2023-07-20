import React from "react";
import Link from "next/link";

const ExerciseCard = ({ exercise }) => (
  <Link href={`/exercise/${exercise.id}`} className="border-2 border-secondary mx-6 my-2
   p-2 min-w-[400px]">
    <div className="bg-white flex flex-col gap-2 items-center justify-center">


      <p className="font-bold text-xl uppercase text-center pt-6 max-w-[300px]"
      >{exercise.name}</p>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy"  
      className="h-auto w-[200px]"/>


      <div className="flex flex-row items-center justify-center gap-2 mb-2">
        <button className=" bg-secondary px-2 py-1 font-mono rounded-sm">
          {exercise.bodyPart}
        </button>
        <button className="bg-highlights  px-4 py-1 font-mono rounded-sm">
          {exercise.target}
        </button>
      </div>
    </div>
  </Link>
);

export default ExerciseCard;
