import React, { useState } from "react";
import Image from "next/image";


const workoutIcons = {
  strength: "/assets/strength.png",
  cardio: "/assets/cardio.png",
  hiit: "/assets/hiit.png",
  walk: "/assets/walking.png",
  run: "/assets/running.png",
  hike: "/assets/hiking.png",
  bike: "/assets/bicycle.png",
  swim: "/assets/swim.png",
  rowing: "/assets/rowing.png",
};

const workoutNames = {
  strength: "Strength",
  cardio: "Cardio",
  walk: "Walk",
  run: "Run",
  hike: "Hike",
  bike: "Bike",
  swim: "Swim",
  rowing: "Rowing",
  hiit: "HIIT",
};

const WorkoutIcon = ({ type }) => (
  <Image
    src={workoutIcons[type]}
    alt={`${workoutNames[type]} Icon`}
    width={42}
    height={42}
  />)

const WorkoutCard = ({ workout }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

const formatDate = (date) => {
  const dateObj = new Date(date);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[dateObj.getUTCMonth()];
  const day = dateObj.getUTCDate();

  // This function will return "st", "nd", "rd", or "th" based on the day number
  const getDaySuffix = (day) => {
    if (day % 10 == 1 && day != 11) {
      return "st";
    } else if (day % 10 == 2 && day != 12) {
      return "nd";
    } else if (day % 10 == 3 && day != 13) {
      return "rd";
    } else {
      return "th";
    }
  };

  return `${month} ${day}${getDaySuffix(day)}`;
};

  return (
    <div
      className={` w-full  p-4 mb-2 rounded-md  transition-all ease-in-out duration-300
    bg-slate-100 shadow-2md  mt-2`}
    >
      <div className="w-full flex flex-col items-center justify-between gap-2">
        <div className="w-[400px] flex flex-row gap-4 items-center justify-between">
          <div className="opacity-90" title={workout.type}>
            {" "}
            <WorkoutIcon type={workout.type} />
          </div>

          <h3 className=" text-slate-500 text-[.8rem] pr-2 flex flex-row items-center justify-center gap-1">
            <span>
              <Image
                src="/assets/calendar.png"
                width={12}
                height={12}
                alt="calendar icon"
              />
            </span>
            {formatDate(workout.date)}
          </h3>
        </div>

        <div className="border p-4 w-80 bg-white/70">
          {" "}
          <p>
            Exercises:{" "}
            {workout.exercises.map((ex, index) => (
              <div key={index}>
                <p className="font-semibold uppercase"> {ex.name}</p>
                <p> {ex.reps} </p>
                <p> {ex.weight} </p>
              </div>
            ))}
          </p>
        </div>
        {workout.notes && (
          <div className="bg-white/70 p-2 rounded-sm w-80">
            <p className="flex flex-row items-start justify-center text-slate-600 gap-2">
              <span className="text-slate-400 flex flex-row items-center justify-center gap-1 ">
                <span>
                  <Image
                    src="/assets/notes2.png"
                    width={15}
                    height={15}
                    alt="notes icon"
                  />
                </span>
                notes:{" "}
              </span>
              {workout.notes}
            </p>
          </div>
        )}
        <div className="w-80 h-[1px] opacity-20 my-2 bg-slate-400"></div>

        <div className="flex flex-row items-center justify-evenly gap-8 w-80">
          {workout.time && (
            <div
              className="flex flex-col items-center justify-center gap-1 p-1 
             whitespace-nowrap w-[90px] border shadow-md"
            >
              <Image
                src="/assets/time.png"
                width={20}
                height={20}
                alt="timer icon"
              />
              <p className="text-[.9rem]">
                {" "}
                {workout.time}{" "}
                <span className="text-[.7rem] opacity-70">min</span>
              </p>
            </div>
          )}

          {workout.distance && (
            <div
              className="flex flex-col items-center justify-center gap-1 p-1 
            whitespace-nowrap w-[90px] border shadow-md"
            >
              <Image
                src="/assets/distance.png"
                width={20}
                height={20}
                alt="distance icon"
              />
              <p className="text-[.9rem]">
                {" "}
                {workout.distance}{" "}
                <span className="text-[.7rem] opacity-70">mi</span>
              </p>
            </div>
          )}

          {workout.calories && (
            <div
              className="flex flex-col items-center justify-center gap-1 p-1 
             whitespace-nowrap w-[90px] border shadow-md"
            >
              <Image
                src="/assets/calories.png"
                width={20}
                height={20}
                alt="timer icon"
              />
              <p className="text-[.9rem]">
                {" "}
                {workout.calories}{" "}
                <span className="text-[.7rem] opacity-70">cal</span>
              </p>
            </div>
          )}
          {workout.heartRate && (
            <div
              className="flex flex-col items-center justify-center gap-1 p-1 
            border shadow-md whitespace-nowrap w-[90px]"
            >
              <Image
                src="/assets/heart.png"
                width={20}
                height={20}
                alt="heart icon"
              />
              <p className="text-[.9rem]">
                {" "}
                {workout.heartRate}{" "}
                <span className="text-[.7rem] opacity-70">BPM</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
