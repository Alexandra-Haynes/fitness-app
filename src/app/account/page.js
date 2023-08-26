import React from "react";
import Link from "next/link";
import Image from "next/image";
import {BiEditAlt} from 'react-icons/bi'
import ConnectToBayze from "../components/ConnectToBayze";

const AccountPage = ({ user }) => {
  // const { savedExercises, previousWorkouts, badges, progress, healthData } =
  //   user;

const healthData={
  weight: 125,
  height: 164,
  bmi: 20.4,
  bfp: 15,
  bmr: 14,
  ibw: 120,
  dcn:2000,
  dwi: 2,
  
}

const savedExercises = [
  {_id: 1, name: 'Rowing' },
  {
    _id:2, name: 'Power walking'
  }
]

const previousWorkouts = [
  { _id: 1, date: "July 15th", exercises: ["100 Pushups", "2k Running"] },
  { _id: 2, date: "July 27th", exercises: ["200m Swimming", "120 Barbell Squats"] },
];
const userEarnedBadges = ["Longest", "5k Run"];

const badgesAvailable = [
  "Longest",
  "5k Run",
  "Fastest",

  "Mix it up",
  "Double down",
];

const badges = badgesAvailable.map((badge) => ({
  name: badge,
  earned: userEarnedBadges.includes(badge),
}));
const progress = {
  personalBests: {
    benchPress: 120,
    deadlift: 220,
    fivekrun: 30,
    plank: 120,
    swim: 30
  },
};

const progressTrack = {
  name: "Goals for July",
  description: "Workout 12 times",
  currentProgress: 8, 
  target: 12,
  percentageAccomplished: function () {
    return (this.currentProgress / this.target) * 100;
  },
};


  return (
    <div
      className="min-h-screen bg-slate-200 px-12 
    w-screen p-4 flex flex-col items-center justify-center gap-1"
    >
      <h1 className="text-2xl uppercase font-bold py-6 mb-2 mt-6">
        My Account
      </h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Progress bar */}
        <div className="my-2">
          <div className="flex flex-row gap-1 items-center justify-start">
            <h2 className="text-xl font-semibold mb-2">{progressTrack.name}</h2>
            <BiEditAlt className="text-slate-600" />
          </div>

          <p className="text-sm mb-2">{progressTrack.description}</p>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-left">
                <span
                  className="text-xs font-semibold inline-block py-1 px-2 uppercase 
                rounded-full  bg-secondary"
                >
                  {progressTrack.percentageAccomplished().toFixed(0)}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block">
                  {progressTrack.currentProgress}/{progressTrack.target}{" "}
                  Workouts
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white">
              <div
                style={{ width: `${progressTrack.percentageAccomplished()}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap
                  justify-center bg-green-700"
              />
            </div>
          </div>
        </div>

        {/* Saved Exercises Section */}
        <div>
          <div className="flex flex-row gap-1 items-center justify-start">
            <h2 className="text-xl font-semibold mb-2">Saved Exercises</h2>
            <BiEditAlt className="text-slate-600" />
          </div>

          <ul>
            {savedExercises.map((exercise) => (
              <li key={exercise._id} className="mb-2 underline text-blue-950">
                <Link href={`/exercise/${exercise._id}`}>{exercise.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Previous Workouts Section */}
        <div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Previous Workouts</h2>
            <table className="min-w-full bg-white/20">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                    Exercises
                  </th>
                </tr>
              </thead>
              <tbody>
                {previousWorkouts.map((workout) => (
                  <tr key={workout._id}>
                    <td className="py-2 px-4 border-b border-gray-200/30">
                      {workout.date}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200/30">
                      {workout.exercises.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-highlights mt-2 rounded-full p-1 w-[80px] text-center">
              See all
            </div>
          </div>
          {/* _____Submit workout_____________ */}
          <div
            className="bg-secondary px-6 py-2 my-6 rounded-lg 
    text-center shadow-lg hover:shadow-xl hover:translate-y-1 transition-all
    ease-in-out"
          >
            <a href="/submit-workout">Submit workout</a>
          </div>
        </div>
        {/* Badges Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Badges</h2>
          <ConnectToBayze />

          <div className="flex flex-wrap">
            {badges.map((badge) => (
              <div className="m-1 text-center" key={badge.name}>
                <Image
                  src={`assets/badges/${badge.name}.png`}
                  alt={badge.name}
                  className={`w-12 h-12 ${
                    badge.earned ? "scale-110" : "grayscale opacity-60"
                  }`}
                />
                <div className="text-xs mt-1">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Records Section */}
        <div>
          <div className="flex flex-row gap-1 items-center justify-start">
            <h2 className="text-xl font-semibold mb-2">Personal Records</h2>
            <BiEditAlt className="text-slate-600" />
          </div>

          <ul>
            <li>Bench Press: {progress.personalBests.benchPress} lbs</li>
            <li>Deadlift: {progress.personalBests.deadlift} lbs</li>
            <li>5k Run: {progress.personalBests.fivekrun} min</li>
            <li>Swimming: {progress.personalBests.swim} min</li>
            <li>Plank: {progress.personalBests.plank} sec</li>
          </ul>
          {/* <div
            className="bg-secondary mt-2 rounded-full whitespace-nowrap
           p-1 w-[100px] text-center"
          >
            Add record
          </div> */}
        </div>

        {/* Health Data Section */}
        <div className="border border-white/30 p-4 rounded-md">
          <div className="flex flex-row gap-1 items-center justify-start">
            <h2 className="text-xl font-semibold mb-2">Health Data</h2>
            <BiEditAlt className="text-slate-600" />
          </div>
          <ul>
            <li>BMI: {healthData.bmi}</li>
            <li>BFP: {healthData.bfp}</li>
            <li>BMR: {healthData.bmr}</li>
            <li>IBW: {healthData.ibw}</li>
            <li>DCN: {healthData.dcn}</li>
            <li>DWI: {healthData.dwi}</li>
            <li>Weight: {healthData.weight} lbs</li>
            <li>Height: {healthData.height} inches</li>
          </ul>
          {/* <div className="bg-secondary mt-2 rounded-full p-1 w-[80px] text-center">
            Update
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
