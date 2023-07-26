import React, { useState } from "react";
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import Image from "next/image";
import {CiSearch} from 'react-icons/ci'

const Experiment = () => {
  const [searchedEx, setSearchedEx] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [exercises, setExercises] = useState([]); //exercise_name output
  const [numOfResults, setNumOfResults] = useState(0);
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "searchedEx") {
      setSearchedEx(value);
    }
  };
const handleOpenFilters = () => {
  return setFilterIsOpen(true);
};


  const fetchExercises = async (e) => {
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
            "dd49a69f86msh997798245d6cb35p1057cajsn472283222f56",
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

  return (
    <section className="">
      <h1 className="text-gray-200 text-6xl text-center py-12 pt-24">
        Search exercises
      </h1>
      <div
        className="flex flex-col-reverse md:flex-row-reverse items-center justify-center 
       px-2 "
      >
        <div className="p-  ">
          <div className="flex flex-row items-center justify-start gap-4">
            {/* <CiSearch /> */}
            <input
              type="text"
              name="searchedEx"
              value={searchedEx}
              onChange={handleChange}
              placeholder={` Search exercises`}
              className="p-2 rounded-lg min-w-[300px] bg-slate-400 placeholder:text-slate-500 border focus:bg-slate-300 focus:text-black"
            />
            <button onClick={handleOpenFilters}>
              <Image
                src="/assets/filter.png"
                width={20}
                height={20}
                alt="filter icon"
              />
            </button>
          </div>

          {filterIsOpen && (
            <div>
              <div className="flex flex-row gap-2 items-center justify-center py-4">
                <label>beginner</label>
                <input
                  type="checkbox"
                  name="selectedDifficulty"
                  checked={selectedDifficulty === "beginner"}
                  onChange={() => setSelectedDifficulty("beginner")}
                />
                <label>intermediate</label>
                <input
                  type="checkbox"
                  name="selectedDifficulty"
                  checked={selectedDifficulty === "Intermediate"}
                  onChange={() => setSelectedDifficulty("Intermediate")}
                />
                <label>advanced</label>
                <input
                  type="checkbox"
                  name="selectedDifficulty"
                  checked={selectedDifficulty === "advanced"}
                  onChange={() => setSelectedDifficulty("advanced")}
                />
              </div>
              {/* let categoriesData = [ "Barbell", "Dumbbells", "Kettlebells",
          "Stretches", "Cables", "Band", "Plate", "TRX", "Bodyweight", "Yoga",
          "Machine", ]; */}
              <div>
                <ul>
                  <li>
                    <label>Barbell</label>
                    <input
                      type="checkbox"
                      name="selectedCategory"
                      checked={selectedCategory === "barbell"}
                      onChange={() => setSelectedCategory("barbell")}
                    />
                  </li>
                  <li>
                    <label>Dumbbells</label>
                    <input
                      type="checkbox"
                      name="selectedCategory"
                      checked={selectedCategory === "Dumbbells"}
                      onChange={() => setSelectedCategory("Dumbbells")}
                    />
                  </li>
                </ul>
              </div>

              <div>
                <label>
                  Target Muscle:
                  <select
                    name="selectedMuscle"
                    value={selectedMuscle}
                    onChange={(e) => setSelectedMuscle(e.target.value)}
                  >
                    <option value="">Select a muscle</option>
                    <option value="muscle_1">Muscle 1</option>{" "}
                    {/* Replace "muscle_1" with the actual muscle value */}
                    <option value="muscle_2">Muscle 2</option>{" "}
                    {/* Replace "muscle_2" with the actual muscle value */}
                    {/* Add more options for different muscles */}
                  </select>
                </label>
              </div>
            </div>
          )}

          <button
            className="bg-secondary p-2 px-4 mt-2 rounded-full"
            onClick={fetchExercises}
          >
            Search
          </button>
        </div>
        <div className="absolute bottom-4 -right-24 ">
          <Image
            src="/assets/training.png"
            width={320}
            height={180}
            alt="fitness icon"
          />
        </div>
      </div>
      <ul className="">
        {exercises.map((exercise) => (
          <ExerciseCard exercise={exercise} />
        ))}
      </ul>
    </section>
  );
};

export default Experiment;
