import React, { useEffect, useState } from "react";

import { exerciseOptions, fetchData } from "../api/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );

      setBodyParts(["all", ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) { //if the input exists in db
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );

      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowerCase().includes(search)
      );

      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });

      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between gap-6 mt-12 px-12">
      <h2 className="font-semibold text-4xl text-left text-secondary">
       What are we working on today
      </h2>
      <div className="flex flex-row gap-2 items-center justify-center ">
        <input
          className="bg-myWhite rounded-full h-8 w-full px-4 font-mono"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search exercises"
          type="text"
        />
        <button
          className="bg-highlights py-1 px-2 rounded-full text-md hover:translate-y-1 hover:bg-secondary" //TODO at search icon
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="w-full h-24 bg-myWhite">
        <HorizontalScrollbar
          data={bodyParts}
          bodyParts
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </div>
    </div>
  );
};

export default SearchExercises;
