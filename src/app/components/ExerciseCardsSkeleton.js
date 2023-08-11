import React from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import Image from "next/image";


const ExerciseCardsSkeleton = () => {
    const borderColors = [
      "green-500",
      "green-500",
      "red-500",
      "yellow-500",
      "green-500",
    ];


    return (
      <div>
        {borderColors.map((color, index) => (
          <div
            key={index}
            className={`w-full h-18 animate-pulse opacity-80 p-4 mb-2 rounded-md shadow-lg transition-all 
            ease-in-out duration-300 border-8 border-b-0 border-r-0 border-t-0 border-l-${color} bg-slate-400`}
          >
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center gap-4">
                <div className="w-full flex flex-col">
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex flex-row gap-4 items-center justify-center">
                      <div className="">
                        <Image
                          src='/assets/categories/dumbbells.png'
                          height={40}
                          width={40}
                          alt='dumbells'
                          className="grayscale"
                        />
                      </div>
                      <h3 className="text-black font-semibold uppercase max-w-[260px]">
                        Loading...
                      </h3>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <button className="text-gray-600 text-sm underline">
                        <LiaSpinnerSolid />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

};

export default ExerciseCardsSkeleton;
