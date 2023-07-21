import React from "react";

import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => (
  <div className="mt-100px">
    <h2 className="text-4xl xs:text-25px ml-20px font-semibold mb-33px">
      Similar <span className="text-red-600 capitalize">Target Muscle</span>{" "}
      exercises
    </h2>
    <div className="p-2 relative">
      {targetMuscleExercises.length !== 0 ? (
        <HorizontalScrollbar data={targetMuscleExercises} />
      ) : (
        <Loader />
      )}
    </div>
    <h2 className="text-4xl xs:text-25px ml-20px mt-100px font-semibold mb-33px">
      Similar <span className="text-red-600 capitalize">Equipment</span>{" "}
      exercises
    </h2>
    <div className="p-2 relative">
      {equipmentExercises.length !== 0 ? (
        <HorizontalScrollbar data={equipmentExercises} />
      ) : (
        <Loader />
      )}
    </div>
  </div>
);

export default SimilarExercises;
