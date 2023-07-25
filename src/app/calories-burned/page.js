import React from "react";
import CalorieCalculatorForm from "../components/CalorieCalculatorForm";
import Image from "next/image";


const CaloriesBurned = () => {
  return (
    <>
      <div className="h-fit min-h-screen relative overflow-x-hidden">
       
        <h1 className="text-3xl font-light py-6 text-center text-primary">
          Calorie Calculator
        </h1>

        <Image
          src="/assets/dumbell.png"
          width={320}
          height={180}
          alt='dumbell icon'
          className="absolute bottom-4 -right-24 -z-10"
        />
        <CalorieCalculatorForm />
      </div>
     
    </>
  );
};

export default CaloriesBurned;
