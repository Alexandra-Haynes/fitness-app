'use client'
import React, {useState} from 'react'
import BodyFatCalculator from '../components/BobyFatCalculator'
import Image from 'next/image';
import BodyMassIndex from '../components/BodyMassIndex';
import BMRCalculator from '../components/BMRCalculator';
import IdealBodyWeightCalculator from '../components/IdealBodyWeightCalculator';

const Calculator = () => {
    const [activeComponent, setActiveComponent] = useState(null);

      const renderActiveComponent = () => {
        switch (activeComponent) {
          case "BodyFat":
            return <BodyFatCalculator />;
          case "BodyMass":
            return <BodyMassIndex />;
          case "BMR":
            return <BMRCalculator />;
          case "IdealWeight":
            return <IdealBodyWeightCalculator />;
          default:
            return (
              <div
                className="mt-6 grid grid-cols-2 gap-y-4 content-center 
              justify-items-center mx-auto max-w-[440px]"
              >
                <button
                  onClick={() => setActiveComponent("BodyFat")}
                  className="bg-orange-100 shadow-md p-4 rounded-sm
                hover:bg-white hover:translate-y-1 hover:shadow-lg 
                transition-all ease-in-out w-[200px] h-[200px] uppercase font-semibold
                flex flex-col items-center justify-center gap-3"
                >
                  <Image
                    src="/assets/calculatorIcon3.png"
                    height={46}
                    width={46}
                    alt="measure icon"
                  />
                  Body Fat Calculator
                </button>
                <button
                  onClick={() => setActiveComponent("BodyMass")}
                  className="bg-pink-100 shadow-md p-4 rounded-sm
                hover:bg-white hover:translate-y-1 hover:shadow-lg 
                transition-all ease-in-out w-[200px] h-[200px] uppercase font-semibold
                flex flex-col items-center justify-center gap-3"
                >
                  <Image
                    src="/assets/calculatorIcon1.png"
                    height={48}
                    width={48}
                    alt="measure icon"
                  />
                  Body Mass Index (BMI)
                </button>
                <button
                  onClick={() => setActiveComponent("BMR")}
                  className="bg-cyan-100 shadow-md p-4 rounded-sm
                hover:bg-white hover:translate-y-1 hover:shadow-lg 
                transition-all ease-in-out w-[200px] h-[200px] uppercase font-semibold
                flex flex-col items-center justify-center gap-3"
                >
                  <Image
                    src="/assets/calculatorIcon2.png"
                    height={48}
                    width={48}
                    alt="measure icon"
                  />
                  Basal Metabolic Rate (BMR) 
                </button>
                <button
                  onClick={() => setActiveComponent("IdealWeight")}
                  className="bg-green-100 shadow-md p-4 rounded-sm
                hover:bg-white hover:translate-y-1 hover:shadow-lg 
                transition-all ease-in-out w-[200px] h-[200px] uppercase font-semibold
                flex flex-col items-center justify-center gap-3"
                >
                  <Image
                    src="/assets/calculatorIcon4.png"
                    height={48}
                    width={48}
                    alt="measure icon"
                  />
                  Ideal Body Weight (IBW) 
                </button>
              </div>
            );
        }
      };

  return (
    <div className="h-fit pt-36 min-h-screen relative overflow-x-hidden bg-slate-100">
      {!activeComponent &&(
        <div>
          <h1 className='mt-6 text-3xl font-semibold uppercase mx-auto text-center'>Calculators</h1>
      <h2 className=" text-lg font-light py-6 text-center text-primary">
       Choose what you want to measure
      </h2>
      </div>)}

      
      {renderActiveComponent()}
      {activeComponent && (
        <button
          onClick={() => setActiveComponent(null)}
          className="absolute bottom-4 left-4 rounded-full p-2
                hover:bg-white hover:animate-pulse hover:translate-y-1  
                transition-all ease-in-out "
        >
          <Image src='/assets/backArrow.png' width={48} height={48} 
          alt='back arrow' title='back to selection' />
         
        </button>
      )}
    </div>
  );
}

export default Calculator
