import React, { useState } from "react";
import ExerciseCard from "./ExerciseCard";
import FrequentExercises from "./FrequentExercises";
import Image from "next/image";
import exercisesData from "../data/exercises.json";
import { CiSearch } from "react-icons/ci";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import SearchExercisesFilter from "./SearchExercisesFilter";

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

const ExerciseSearch = () => {
  const [searchedEx, setSearchedEx] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [exercises, setExercises] = useState([]); //exercise_name output
  const [searchClicked, setSearchClicked] = useState(false);
  const [numOfResults, setNumOfResults] = useState(0);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [isRocketAnimating, setRocketAnimating] = useState(false);
  const [displayRocket, setDisplayRocket] = useState(true);

  // Pagination state variables
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const handleMuscleSelection = (muscle) => {
    setSelectedMuscle(muscle);
    console.log('muscle selected', muscle)
  };

  const handleOpenFilters = () => {
    return setFilterIsOpen(true);
  };
  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedMuscle(null);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const fetchAutocompleteSuggestions = (input) => {
    try {
      const filteredExerciseNames = exercisesData.filter((exercise) =>
        exercise.exercise_name.toLowerCase().includes(input.toLowerCase())
      );

      let suggestionsWithCloseButton = filteredExerciseNames;

      if (input.trim() !== "") {
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
      setSelectedSuggestion("");
      if (value.trim() === "") {
        setShowSuggestions(false);
      } else {
        setShowSuggestions(true);
        fetchAutocompleteSuggestions(value);
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

  const filterByName = (exercises, name) => {
    console.log("filtering by name...");
    return exercises.filter((exercise) =>
      exercise.exercise_name.toLowerCase().includes(name.toLowerCase())
    );
  };

  const filterByCategory = (exercises, category) => {
    console.log("filtering by category...");
    return category
      ? exercises.filter((exercise) => exercise.Category.toLowerCase() === category.toLowerCase())
      : exercises;
  };

  const filterByDifficulty = (exercises, difficulty) => {
    console.log("filtering by difficulty...");
    return difficulty
      ? exercises.filter((exercise) => exercise.Difficulty === difficulty)
      : exercises;
  };

  const filterByMuscle = (exercises, muscle) => {
    console.log("filtering by muscle...");
    return muscle
      ? exercises.filter(
          (exercise) =>
            exercise.target &&
            exercise.target.Primary &&
            exercise.target.Primary.length > 0 &&
            exercise.target.Primary[0] === muscle
        )
      : exercises;
  };

  const fetchExercises = (e) => {
    handleSearchClick();
    handleRocketTakeoff();
    e.preventDefault();

    try {
      let filteredExercises = [...exercisesData];
      console.log(filteredExercises);

      filteredExercises = filterByName(filteredExercises, searchedEx);
      filteredExercises = filterByCategory(filteredExercises, selectedCategory);
      filteredExercises = filterByDifficulty(
        filteredExercises,
        selectedDifficulty
      );
      filteredExercises = filterByMuscle(filteredExercises, selectedMuscle);

      setExercises(filteredExercises);
      setNumOfResults(filteredExercises.length);
      setCurrentPage(1);

      console.log(exercises);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSearch = () => {
    setSearchedEx("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestion("");
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setSelectedMuscle(null);
    setExercises([]);
    setSearchClicked(false);
    setNumOfResults(0);
    setFilterIsOpen(false);
    setCurrentPage(1);
    setRocketAnimating(false);
    setDisplayRocket(true);
  };

  const handleRocketTakeoff = () => {
    setRocketAnimating(true);
    setTimeout(() => {
      setRocketAnimating(false);
      setDisplayRocket(false);
    }, 2000);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExercises = exercises.slice(startIndex, endIndex);

  return (
    <section
      className="relative min-h-screen h-fit  mx-auto max-w-[500px]
     flex flex-col items-center justify-start pt-24 pb-24"
    >
      <h1 className="text-gray-200 text-4xl text-center py-12 ">
        Search exercises
      </h1>
      <div
        className="w-[80%] flex flex-col-reverse md:flex-row-reverse
         items-center justify-center px-2 "
      >
        {/* _____________________SEARCH BAR___________________________________ */}

        <div className=" ">
          <div className="flex flex-row items-center justify-start gap-4 w-[400px]">
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
                className="shadow-xl p-2 rounded-lg min-w-[350px] bg-slate-300
               placeholder:text-slate-500 border focus:bg-slate-300
                focus:text-black self-start"
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
              <CiSearch
                className="absolute right-2 
              top-1/2 transform -translate-y-1/2 text-slate-500"
              />
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
            <SearchExercisesFilter
              searchedEx={searchedEx}
              setShowSuggestions={setShowSuggestions}
              suggestions={suggestions}
              handleSelect={handleSelect}
              setSelectedDifficulty={setSelectedDifficulty}
              selectedDifficulty={selectedDifficulty}
              handleClearFilters={handleClearFilters}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              categories={categories}
              handleMuscleSelection={handleMuscleSelection}
              selectedMuscle={selectedMuscle}
              muscles={muscles}
              filterIsOpen={filterIsOpen}
              setFilterIsOpen={setFilterIsOpen}
            />
          )}
          {/* _________________________________________________SEARCH BUTTON___________________________________ */}

          <div className="flex flex-row items-center justify-start gap-4 mt-6">
            <button
              className="bg-secondary uppercase p-2 px-8 rounded-full 
            hover:translate-y-1 shadow-xl transition-all ease-in-out duration-300"
              onClick={fetchExercises}
            >
              Search
            </button>

            <button className="hover:scale-105" onClick={resetSearch} title='Reset search'>
              <Image
                src="/assets/reset.png"
                width={28}
                height={28}
                alt="reset icon"
              />
            </button>
          </div>
        </div>
      </div>
      {/* _________________________________________________RESULTS___________________________________ */}

      <ul className="mt-8">
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </ul>
      {currentExercises.length === 0 && searchClicked && (
        <p>No exercises match the criteria.</p>
      )}
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

      <div className="flex justify-center my-4 absolute bottom-0">
        {currentPage > 1 && (
          <button
            className="px-3 py-1  mx-1 my-2   "
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <AiFillCaretLeft className="hover:text-slate-700 hover:scale-120" />
          </button>
        )}
        {Array.from(
          { length: Math.ceil(exercises.length / itemsPerPage) },
          (_, index) => index + 1
        )
          .filter(
            (pageNumber) =>
              pageNumber === currentPage ||
              pageNumber === currentPage - 1 ||
              pageNumber === currentPage + 1
          )
          .map((pageNumber) => (
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

        {currentPage < Math.ceil(exercises.length / itemsPerPage) && (
          <button
            className="px-3 py-1 mx-1 my-2  "
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <AiFillCaretRight className="hover:text-slate-700 hover:scale-120" />
          </button>
        )}
      </div>
    </section>
  );
};

export default ExerciseSearch;
