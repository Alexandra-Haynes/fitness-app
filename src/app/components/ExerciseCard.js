import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineFolderAdd, AiOutlineLoading3Quarters } from "react-icons/ai";
import {MdOutlineBookmarkAdded} from 'react-icons/md'
import NotLoggedIn from "./NotLoggedIn";

const ExerciseCard = ({ exercise }) => {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false); 

  // if (session) {
  // let userId = session.user._id;
  // console.log(userId)
  // }

  const saveExercise = async () => {
    setIsLoading(true);
    try {
      if (!session) {
      setIsNotLoggedIn(true)
      setIsLoading(false)
      return;
      }

      const { id, ...exerciseWithoutId } = exercise;
      const userId = session.user._id;

      const postData = {
        userId,
        exercise: exerciseWithoutId,
      };
      const response = await axios.post("/api/save-exercise", postData);

      if (response.data && response.data.message) {
        console.log(response.data.message);
        setIsSaved(true);
        setSuccessMessage("Exercise successfully saved!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      } else if (response.status) {
        console.log(`Server responded with status code: ${response.status}`);
        setIsSaved(true);
        setSuccessMessage("Exercise saved!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
    setIsLoading(false);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  //steps and target need custom formatting
  const formatSteps = (stepsArray) => {
    return stepsArray.map((step, index) => (
      <li key={index} className="text-[.8rem]">
        {step}
      </li>
    ));
  };
  const formatTarget = (targetObject) => {
    const primaryTargets = targetObject.Primary[0];
    const secondaryTargets = targetObject.Secondary;

    // if (secondaryTargets) {
    //   return `Primary Target: ${primaryTargets}\nSecondary Target: ${secondaryTargets}`;
    // } else {
    //   return `Target: ${primaryTargets}`;
    // }
    return primaryTargets;
  };

  return (
    <div
      className={` w-[400px]  p-4 mb-2 rounded-md shadow-lg transition-all ease-in-out duration-300
    ${expanded ? "bg-slate-200 shadow-2xl" : "bg-slate-400 hover:scale-[102%]"}
    
    ${
      exercise.Difficulty === "Beginner"
        ? "border-8 border-b-0 border-r-0 border-t-0 border-l-green-500"
        : exercise.Difficulty === "Intermediate"
        ? "border-8 border-b-0 border-r-0 border-t-0 border-l-yellow-500"
        : exercise.Difficulty === "Advanced"
        ? "border-8 border-b-0 border-r-0 border-t-0 border-l-red-500"
        : "border-8 border-b-0 border-r-0 border-t-0 border-l-gray-400"
    }
    
    `}
    >
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-4">
          <div className="w-full flex flex-col ">
            <div className="  flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row gap-4 items-center justify-center">
                <div className="">
                  <Image
                    src={`/assets/categories/${exercise.Category.toLowerCase()}.png`}
                    height={40}
                    width={40}
                    title={`Category: ${exercise.Category.toLowerCase()}`}
                    alt={exercise.Category.toLowerCase()}
                  />
                </div>

                <h3 className=" text-black font-semibold uppercase max-w-[260px]">
                  {exercise.exercise_name}
                </h3>
              </div>
              <div className="flex flex-row gap-2 items-center justify-center">
                <button
                  className="text-gray-600 text-sm underline "
                  onClick={handleExpand}
                >
                  {expanded ? (
                    <GrFormClose
                      className="text-2xl hover:scale-110 "
                      title="Close details"
                    />
                  ) : (
                    <MdOutlineOndemandVideo
                      className="text-xl hover:scale-110"
                      title="Show details"
                    />
                  )}
                </button>

                <button
                  className="cursor-pointer"
                  onClick={saveExercise}
                  title="Save exercise to your list"
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="text-2xl text-white animate-spin" />
                  ) : isSaved ? (
                    <MdOutlineBookmarkAdded className="text-2xl text-green-700" />
                  ) : (
                    <AiOutlineFolderAdd className="text-2xl hover:scale-110" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* _________________Expanded_______________ */}
      {expanded && (
        <div className=" pt-12 p-2 max-w-[400px]">
          <div className="flex flex-col gap-2 items-center justify-between">
            <video
              autoPlay
              mute
              controls
              src={exercise.videoURL}
              className="shadow-md  md:max-w-[380px]"
            ></video>
          </div>

          <div className="mt-4 flex flex-row-reverse items-start justify-between gap-4">
            <ol className="text-slate-800  mt-4 px-4 border-l-2 border-slate-600">
              {formatSteps(exercise.steps)}
            </ol>
            <div>
              <Image
                src={`/assets/muscles/${formatTarget(exercise.target)}.png`}
                height={100}
                width={100}
                title={`Target muscle: ${formatTarget(exercise.target)}`}
                alt={exercise.title}
                className="drop-shadow-2xl min-h-[100px] min-w-[100px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* _________________Message popup exercise saved_______________ */}

      <div className="bg-white absolute -top-12 right-0 animate-slide-in-left">
        {successMessage && (
          <div className="p-2  text-green-500">{successMessage}</div>
        )}
      </div>
      {isNotLoggedIn && <NotLoggedIn />}
    </div>
  );
};

export default ExerciseCard;
