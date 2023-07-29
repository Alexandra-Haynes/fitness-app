'use client'
import React from 'react'
import BodyFatCalculator from '../components/BobyFatCalculator'
import Image from 'next/image';
import BodyMassIndex from '../components/BodyMassIndex';

const Calculator = () => {
  return (
    <div className="h-fit min-h-screen relative overflow-x-hidden">
      <h1 className="text-3xl font-light py-6 text-center text-primary">
        Calorie Calculator
      </h1>

      <Image
        src="/assets/training.png"
        width={320}
        height={320}
        alt="dumbell and workout plan icon"
        className="absolute bottom-4 -right-24 -z-10"
      />
      {/* <BodyFatCalculator /> */}
      <BodyMassIndex />
    </div>
  );
}

export default Calculator
