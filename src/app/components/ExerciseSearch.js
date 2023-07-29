import React, { useState } from "react";
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import FrequentExercises from "./FrequentExercises";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { BsCheck } from "react-icons/bs";
import {IoMdClose} from 'react-icons/io'

const ExerciseSearch = () => {
  const [searchedEx, setSearchedEx] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedSuggestion, setSelectedSuggestion] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [exercises, setExercises] = useState([]); //exercise_name output
 
    const [searchClicked, setSearchClicked] = useState(false);


  const [numOfResults, setNumOfResults] = useState(0);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
 const [isRocketAnimating, setRocketAnimating] = useState(false);
 const [displayRocket, setDisplayRocket] = useState(true)


  // Pagination state variables
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: "barbell", label: "Barbell" },
    { id: "dumbbells", label: "Dumbbells" },
    { id: "kettlebells", label: "Kettlebells" },
    { id: "stretches", label: "Stretches" },
    { id: "cables", label: "Cables" },
    { id: "band", label: "Bands" },
    { id: "plate", label: "Plates" },
    { id: "trx", label: "TRX" },
    { id: "bodyweight", label: "Bodyweight" },
    { id: "yoga", label: "Yoga" },
    { id: "machine", label: "Machine" },
  ];
  const muscles = [
    "Biceps",
    "Forearms",
    "Shoulders",
    "Triceps",
    "Quads",
    "Glutes",
    "Lats",
    "Mid back",
    "Lower back",
    "Hamstrings",
    "Chest",
    "Abdominals",
    "Obliques",
    "Traps",
    "Calves",
  ];

  const handleMuscleSelection = (muscle) => {
    setSelectedMuscle(muscle);
  };

  const handleOpenFilters = () => {
    return setFilterIsOpen(true);
  };
  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedDifficulty("");
    setSelectedMuscle("");
  };

  const handleCloseFilters = () => {
    setFilterIsOpen(false);
  };

const handleSearchClick = () => {
  setSearchClicked(true);
  
};


 const fetchAutocompleteSuggestions = async (input) => {
  
   try {
     const response = await axios.get(
       "https://musclewiki.p.rapidapi.com/exercises",
       {
         params: {
           name: input,
         },
         headers: {
           "X-RapidAPI-Key":
             "7fe9b1ed76msha35f8532c12af1fp1a55d7jsncc554e99d95b",
           "X-RapidAPI-Host": "musclewiki.p.rapidapi.com",
         },
       }
     );

     const filteredExerciseNames = response.data.filter((exercise) =>
       exercise.exercise_name.toLowerCase().includes(input.toLowerCase())
     );

     
    let suggestionsWithCloseButton = filteredExerciseNames;

    if (input.trim() !== "") {
      // Add the "Close Suggestions" option when the input is not empty
      suggestionsWithCloseButton = [
        { exercise_name: "Close Suggestions" },
        ...filteredExerciseNames,
      ];
    }

    setSuggestions(suggestionsWithCloseButton);

     
   } catch (error) {
     console.error(error);
   }
 };


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "searchedEx") {
      setSearchedEx(value);
      setSelectedSuggestion(""); // Clear the selected suggestion when typing in the search bar
      if (value.trim() === "") {
        setShowSuggestions(false); // Hide the suggestions when the search bar is empty
      } else {
        setShowSuggestions(true); // Show the suggestion dropdown when typing
        fetchAutocompleteSuggestions(value); // Fetch suggestions based on the current input value
      }
    }
  };
  const handleSelect = (value) => {
   if (value === "Close Suggestions") {
     setShowSuggestions(false);
   } else {
     setSelectedSuggestion(value);
     setSearchedEx(value);
     setShowSuggestions(false);
   }
  };

  const fetchAllExercises = async () => {
    try {
      const response = await axios.get(
        "https://musclewiki.p.rapidapi.com/exercises",
        {
          params: {
            name: "", // Set name as an empty string to get all exercises
          },
          headers: {
            "X-RapidAPI-Key":
              "7fe9b1ed76msha35f8532c12af1fp1a55d7jsncc554e99d95b",
            "X-RapidAPI-Host": "musclewiki.p.rapidapi.com",
          },
        }
      );

      // Filter exercises to match the current search input
      const filteredExercises = response.data.filter((exercise) =>
        exercise.exercise_name.toLowerCase().includes(searchedEx.toLowerCase())
      );

      setExercises(filteredExercises);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExercises = async (e) => {
    handleSearchClick();
    handleRocketTakeoff()
    e.preventDefault();
    let url = "https://musclewiki.p.rapidapi.com/exercises";
    try {
      const response = await axios.get(url, {
        params: {
          name: searchedEx,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          muscle: selectedMuscle,
        },
        headers: {
          "X-RapidAPI-Key":
            "7fe9b1ed76msha35f8532c12af1fp1a55d7jsncc554e99d95b",
          // process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "musclewiki.p.rapidapi.com",
        },
      });

      setExercises(response.data);
      //   setNumOfResults(exercises.length)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


 

 const handleRocketTakeoff = () => {
   setRocketAnimating(true);
   setTimeout(() => {
     setRocketAnimating(false);
     setDisplayRocket(false)
   }, 2000);
 };



  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExercises = exercises.slice(startIndex, endIndex);

  return (
    <section className="relative h-fit md:w-[80%] pt-12  mx-auto flex flex-col items-center justify-center">
      <h1 className="text-gray-200 text-4xl text-center py-12 pt-24">
        Search exercises
      </h1>
      <div
        className="w-[80%] flex flex-col-reverse md:flex-row-reverse items-center justify-center 
       px-2 "
      >
        {/* _________________________________________________SEARCH BAR___________________________________ */}

        <div className=" ">
          <div className="flex flex-row items-center justify-start gap-4">
            {/* <CiSearch /> */}
            <div className="relative">
              <input
                type="text"
                name="searchedEx"
                value={searchedEx}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(true)} // Show suggestions when the input is focused
                // onBlur={() => setShowSuggestions(false)} // Hide suggestions when the input loses focus
                placeholder=""
                className="shadow-xl p-2 rounded-lg min-w-[300px] bg-slate-300
               placeholder:text-slate-500 border focus:bg-slate-300 focus:text-black"
              />

              {/* _________________________________________________SUGGESTIONS___________________________________ */}

              {showSuggestions && (
                <div
                  className="absolute left-0 
                w-full bg-slate-100  mt-1 overflow-y-scroll max-h-[400px] shadow-2xl"
                >
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className={`p-1 pl-4 text-[.7rem] cursor-pointer hover:bg-slate-300 ${
                        suggestion.exercise_name === "Close Suggestions"
                          ? "text-red-500 text-right" // Add custom styles for the close button
                          : ""
                      }`}
                      onClick={() => handleSelect(suggestion.exercise_name)}
                    >
                      {suggestion.exercise_name}
                    </div>
                  ))}
                </div>
              )}
              <CiSearch className="absolute right-2 
              top-1/2 transform -translate-y-1/2 text-slate-500" />
            </div>

            {/* _________________________________________________FILTER___________________________________ */}

            <button
              onClick={handleOpenFilters}
              className="hover:scale-105 transition-all duration-300"
            >
              <Image
                src="/assets/filter.png"
                width={20}
                height={20}
                alt="filter icon"
              />
            </button>
          </div>

          {filterIsOpen && (
            <div className="flex flex-col items-start mt-4 gap-2 ">
              {/* _________________________________________________DIFFICULTY___________________________________ */}

              <div className="w-full flex flex-row items-center justify-between">
                <div className=" flex flex-row gap-2 items-center justify-center py-4 text-slate-300">
                  Difficulty level:{" "}
                  <div
                    onClick={() => setSelectedDifficulty("beginner")}
                    className={`h-6 w-6 rounded-full bg-green-500  hover:scale-105 cursor-pointer
                  flex items-center justify-center${
                    selectedDifficulty === "beginner" ? "border-black " : ""
                  }`}
                  >
                    {selectedDifficulty === "beginner" && (
                      <BsCheck className="text-black text-2xl" />
                    )}
                  </div>
                  <div
                    onClick={() => setSelectedDifficulty("intermediate")}
                    className={`h-6 w-6 rounded-full bg-yellow-400 hover:scale-105 cursor-pointer
                   flex items-center justify-center${
                     selectedDifficulty === "beginner" ? "border-black " : ""
                   }`}
                  >
                    {selectedDifficulty === "intermediate" && (
                      <BsCheck className="text-black text-2xl" />
                    )}
                  </div>
                  <div
                    onClick={() => setSelectedDifficulty("advanced")}
                    className={`h-6 w-6 rounded-full bg-red-600  hover:scale-105 cursor-pointer
                  flex items-center justify-center${
                    selectedDifficulty === "advanced" ? "border-black " : ""
                  }`}
                  >
                    {selectedDifficulty === "advanced" && (
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
                className="max-w-[460px] md:max-w-[800px] grid grid-cols-4
               lg:grid-cols-6 grid-rows-3 gap-2  text-slate-300"
              >
                {" "}
                Category:
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`text-[.8rem] flex items-center min-w-[80px] max-w-[100px] justify-center text-center rounded cursor-pointer text-black ${
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
                  className="z-20 mt-2  max-w-[430px] lg:max-w-[800px]
              grid grid-cols-4 lg:grid-cols-7 gap-2   "
                >
                  {muscles.map((muscle) => (
                    <div
                      key={muscle}
                      onClick={() => handleMuscleSelection(muscle)}
                      className={`text-[.8rem]  p-1 px-2 rounded  w-[90px] cursor-pointer whitespace-nowrap flex items-center justify-center text-center text-black ${
                        selectedMuscle === muscle
                          ? "bg-slate-200"
                          : "bg-slate-400"
                      }`}
                    >
                      {muscle}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* _________________________________________________SEARCH BUTTON___________________________________ */}

          <button
            className="bg-secondary uppercase p-2 px-8 mt-6 rounded-full 
            hover:translate-y-1 shadow-xl transition-all ease-in-out duration-300"
            onClick={fetchExercises}
          >
            Search
          </button>
        </div>
      </div>
      {/* _________________________________________________RESULTS___________________________________ */}

      <ul className="mt-8">
        {currentExercises.map((exercise) => (
          <ExerciseCard exercise={exercise} />
        ))}
      </ul>
      {/* _________________________________________________FREQ EXERCISE__________________________________ */}

      {!searchClicked && <FrequentExercises />}

      {/* _____________________________________ROCKET_________________________________ */}
      {displayRocket && (
        <div
          className={`absolute -bottom-16
         mt-12 mr-4 self-end 
          ${isRocketAnimating ? "animate-rocket-out" : "animate-bounce-slow"}`}
          id="rocket"
        >
          <Image
            src="/assets/rocket.png"
            width={40}
            height={40}
            alt="rocket illustration"
          />
        </div>
      )}

      {/* _________________________________________________PAGINATION___________________________________ */}

      <div className="flex justify-center my-4">
        {Array.from(
          { length: Math.ceil(exercises.length / itemsPerPage) },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-3 py-1 rounded-full mx-1 my-2 shadow-lg hover:scale-105 ${
              pageNumber === currentPage
                ? "bg-slate-400  scale-110"
                : "bg-slate-500 text-gray-800"
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExerciseSearch;
