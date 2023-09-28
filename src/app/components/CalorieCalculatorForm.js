"use client";

import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

let API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;

const CalorieCalculatorForm = () => {
  const [activityName, setActivityName] = useState("");
  const [weight, setWeight] = useState(125);
  const [duration, setDuration] = useState(30);
  const [activities, setActivities] = useState([]);
  const [activityNotFound, setActivityNotFound] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "activityName") {
      setActivityName(value);
    } else if (name === "weight") {
      setWeight(value);
    } else if (name === "duration") {
      setDuration(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        "https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned",
        {
          params: {
            activity: activityName,
            weight: weight,
            duration: duration,
          },
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "calories-burned-by-api-ninjas.p.rapidapi.com",
          },
        }
      );

      if (response.data.length > 0) {
        setActivities(response.data);
        setActivityNotFound(false);
      } else {
        setActivities([]);
        setActivityNotFound(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //TODO: add most frequent searches
  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="bg-white border w-[90%] mx-auto 
      flex flex-col items-start justify-center gap-6
      rounded-md shadow-xl p-8 max-w-[800px]"
      >
        <label className="font-semibold pr-2">
          Activity Name:
          <input
            type="text"
            name="activityName"
            value={activityName}
            onChange={handleInputChange}
            className="text-xl font-mono my-2 text-black 
            border-2 border-highlights  p-2 rounded-sm"
          />
        </label>
        <label className="font-semibold">
          Weight
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={handleInputChange}
            placeholder="Enter your weight"
            className="text-xl ml-2 font-mono w-[80px] text-center
             focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          />{" "}
          lbs
        </label>
        <label className="font-semibold">
          Workout duration
          <input
            type="number"
            name="duration"
            value={duration}
            onChange={handleInputChange}
            placeholder="Enter the duration"
            className="text-xl ml-2 font-mono w-[80px] text-center
             focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          />{" "}
          min
        </label>
        <button
          type="submit"
          className="bg-primary p-4 rounded-full shadow-xl text-white text-center
        hover:bg-primary/80 hover:translate-y-1 px-8
        "
        >
          Calculate Calories
        </button>
      </form>

      {activityNotFound && (
        <ErrorMessage
          errorText={`We couldn&apos;t find this activity. Try a different version. For
            example: run instead of running, pushups instead of push ups or
            push-ups.`}
        />
      )}
      {/* Display activity details */}
      {activities.length > 0 && (
        <div
          className="bg-white border w-[90%] max-w-[800px] mx-auto 
  rounded-md shadow-xl p-6 my-12"
        >
          <table className="w-full text-center ">
            <thead>
              <tr className="border-b-2 border-b-highlights">
                <th className="py-3 pl-2 text-left">Activity Name</th>
                <th className="py-3">Calories per hour</th>
                <th className="py-3">Total calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "" : "bg-primary/20"}
                >
                  <td className="py-3 pl-2 font-semibold text-primary text-left">
                    {activity.name}
                  </td>
                  <td className="py-3">{activity.calories_per_hour}</td>
                  <td className="py-3">{activity.total_calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculatorForm;
