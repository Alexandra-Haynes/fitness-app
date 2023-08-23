// FilterComponent.js
import React from "react";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const SearchExercisesFilter = ({
  setSelectedDifficulty,
  selectedDifficulty,
  setSelectedCategory,
  selectedCategory,
  categories,
  handleClearFilters,
  handleMuscleSelection,
  selectedMuscle,
  muscles,
  filterIsOpen,
  setFilterIsOpen,
}) => {
  const handleCloseFilters = () => {
    setFilterIsOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col items-start mt-4 gap-2">
        {/* _________________________________________________DIFFICULTY___________________________________ */}

        <div className="w-full flex flex-row items-center justify-between">
          <div className=" flex flex-row gap-2 items-center justify-center py-4
           text-slate-300">
            Difficulty level:{" "}
            <div
              onClick={() => setSelectedDifficulty("Beginner")}
              className={`h-6 w-6 rounded-full bg-green-500  
              hover:scale-105 cursor-pointer
                  flex items-center justify-center${
                    selectedDifficulty === "Beginner" ? "border-black " : ""
                  }`}
            >
              {selectedDifficulty === "Beginner" && (
                <BsCheck className="text-black text-2xl" />
              )}
            </div>
            <div
              onClick={() => setSelectedDifficulty("Intermediate")}
              className={`h-6 w-6 rounded-full bg-yellow-400 hover:scale-105 cursor-pointer
                   flex items-center justify-center${
                     selectedDifficulty === "Intermediate" ? "border-black " : ""
                   }`}
            >
              {selectedDifficulty === "Intermediate" && (
                <BsCheck className="text-black text-2xl" />
              )}
            </div>
            <div
              onClick={() => setSelectedDifficulty("Advanced")}
              className={`h-6 w-6 rounded-full bg-red-600  hover:scale-105 cursor-pointer
                  flex items-center justify-center${
                    selectedDifficulty === "Advanced" ? "border-black " : ""
                  }`}
            >
              {selectedDifficulty === "Advanced" && (
                <BsCheck className="text-black text-2xl" />
              )}
            </div>
          </div>

          {/* _________________________________________________FILTER BUTTONS___________________________________ */}

          <div className="flex flex-row items-center justify-center gap-4">
            {selectedCategory || selectedDifficulty || selectedMuscle ? (
              <button
                className=" text-slate-400  hover:text-slate-300 underline underline-offset-2"
                onClick={handleClearFilters}
              >
                Clear all
              </button>
            ) : null}
            {filterIsOpen && (
              <button
                className=" text-slate-400 hover:text-slate-300  underline underline-offset-2"
                onClick={handleCloseFilters}
              >
                <IoMdClose />
              </button>
            )}
          </div>
        </div>

        {/* _________________________________________________CATEGORY___________________________________ */}
        <div
          className="max-w-[460px] grid grid-cols-4
                grid-rows-3 gap-2  text-slate-300"
        >
          {" "}
          Category:
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`text-[.8rem] flex items-center min-w-[90px] justify-center text-center rounded cursor-pointer text-black ${
                selectedCategory === category.id
                  ? "  bg-slate-200"
                  : "bg-slate-400"
              }`}
            >
              {category.label}
            </div>
          ))}
        </div>

        {/* _________________________________________________MUSCLE___________________________________ */}

        <div className="text-slate-300 mt-4">
          <p className="col-span-4">Target Muscle:</p>
          <div
            className="z-20 mt-2  max-w-[430px] 
              grid grid-cols-4 gap-2   "
          >
            {muscles.map((muscle) => (
              <div
                key={muscle}
                onClick={() => handleMuscleSelection(muscle)}
                className={`text-[.8rem]  p-1 px-2 rounded  w-[90px] cursor-pointer
                 whitespace-nowrap flex items-center justify-center text-center text-black ${
                  selectedMuscle === muscle ? "bg-slate-200" : "bg-slate-400"
                }`}
              >
                {muscle}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchExercisesFilter;
