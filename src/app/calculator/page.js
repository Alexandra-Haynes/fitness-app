"use client";

import React, { useState } from "react";
import Image from "next/image";
import BodyFatCalculator from "../components/BobyFatCalculator";
import BodyMassIndex from "../components/BodyMassIndex";
import BMRCalculator from "../components/BMRCalculator";
import IdealBodyWeightCalculator from "../components/IdealBodyWeightCalculator";

const componentConfig = [
  {
    key: "BodyFat",
    component: BodyFatCalculator,
    imageSrc: "/assets/calculatorIcon3.png",
    title: "Body Fat Calculator",
  },
  {
    key: "BodyMass",
    component: BodyMassIndex,
    imageSrc: "/assets/calculatorIcon1.png",
    title: "Body Mass Index (BMI)",
  },
  {
    key: "BMR",
    component: BMRCalculator,
    imageSrc: "/assets/calculatorIcon2.png",
    title: "Basal Metabolic Rate (BMR)",
  },
  {
    key: "IdealWeight",
    component: IdealBodyWeightCalculator,
    imageSrc: "/assets/calculatorIcon4.png",
    title: "Ideal Body Weight (IBW)",
  },
];

const CalculatorButton = ({ onClick, imageSrc, title }) => (
  <button
    onClick={onClick}
    className="bg-white shadow-md p-4 rounded-sm
        hover:translate-y-1 hover:shadow-lg 
        transition-all ease-in-out w-[200px] h-[200px] uppercase font-semibold
        flex flex-col items-center justify-center gap-3"
  >
    <Image src={imageSrc} height={48} width={48} alt="measure icon" />
    {title}
  </button>
);

const Calculator = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const ActiveComp = componentConfig.find(
    (comp) => comp.key === activeComponent
  )?.component;

  return (
    <div className="h-fit pt-36 min-h-screen relative overflow-x-hidden bg-slate-100">
      {!activeComponent && (
        <div>
          <h1 className="mt-6 text-3xl font-semibold uppercase mx-auto text-center">
            Calculators
          </h1>
          <h2 className=" text-lg font-light py-6 text-center text-primary">
            Choose what you want to measure
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-y-4 content-center justify-items-center mx-auto max-w-[440px]">
            {componentConfig.map((comp) => (
              <CalculatorButton
                key={comp.key}
                onClick={() => setActiveComponent(comp.key)}
                imageSrc={comp.imageSrc}
                title={comp.title}
              />
            ))}
          </div>
        </div>
      )}

      {ActiveComp && <ActiveComp />}
      {activeComponent && (
        <button
          onClick={() => setActiveComponent(null)}
          className="absolute bottom-4 left-4 rounded-full p-2
                hover:bg-white hover:animate-pulse hover:translate-y-1  
                transition-all ease-in-out "
        >
          <Image
            src="/assets/backArrow.png"
            width={48}
            height={48}
            alt="back arrow"
            title="back to selection"
          />
        </button>
      )}
    </div>
  );
};

export default Calculator;
