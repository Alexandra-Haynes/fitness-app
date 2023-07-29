'use client'

import { useState } from "react";
import axios from "axios";

const fetchBodyFat = async (gender, height, weight, age) => {
  const { data } = await axios.get(
    "https://health-calculator-api.p.rapidapi.com/bodyfat/imperial",
    {
      headers: {
        "X-RapidAPI-Key": "7fe9b1ed76msha35f8532c12af1fp1a55d7jsncc554e99d95b",
        "X-RapidAPI-Host": "health-calculator-api.p.rapidapi.com",
      },
      params: { gender, height, weight, age },
    }
  );
  return data;
};

function BodyFatCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("70");
  const [weight, setWeight] = useState("150");
  const [age, setAge] = useState("25");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateBodyFat = async () => {
    setLoading(true);
    setError(null);
    try {
      const bodyFatData = await fetchBodyFat(gender, height, weight, age);
      setData(bodyFatData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl text-slate-500 text-center pb-6">
        Body Fat Calculator
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateBodyFat();
        }}
        className="bg-white border w-[90%] mx-auto 
      flex flex-col items-start justify-center gap-6
      rounded-md shadow-xl p-8 max-w-[800px]"
      >
        <div className="flex flex-row items-center justify-center gap-4 font-semibold pr-2">
          Gender:
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              className="hidden"
            />
            <label htmlFor="male" className="cursor-pointer">
              <span
                className={`mr-2 inline-block w-5 h-5 rounded-full border border-gray-500 ${
                  gender === "male" ? "bg-cyan-300" : "bg-white"
                }`}
              ></span>
              Male
            </label>
          </div>
          <div className="flex flex-row items-center justify-center mt-2">
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              className="hidden"
            />
            <label htmlFor="female" className="cursor-pointer">
              <span
                className={`mr-2 inline-block w-5 h-5 rounded-full border border-gray-500 ${
                  gender === "female" ? "bg-pink-500" : "bg-white"
                }`}
              ></span>
              Female
            </label>
          </div>
        </div>
        <label className="font-semibold">
          Height:
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="text-xl ml-2 font-mono w-[80px] text-center
            focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          />
        </label>
        <label className="font-semibold">
          Weight:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="text-xl ml-2 font-mono w-[80px] text-center
            focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          />
        </label>
        <label className="font-semibold">
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="text-xl ml-2 font-mono w-[80px] text-center
            focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          />
        </label>
        <button
          type="submit"
          className="bg-primary p-4 rounded-full shadow-xl text-white text-center
          hover:bg-primary/80 hover:translate-y-1 px-8"
        >
          Calculate Body Fat
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>An error has occurred: {error}</p>}
      {data && (
        <div
          className="bg-white border w-[90%] max-w-[800px] mx-auto 
  rounded-md shadow-xl p-6 my-12"
        >
          <table className="w-full text-center ">
            <thead>
              <tr className="border-b-2 border-b-highlights">
                <th className="py-3 pl-2 text-left">Parameter</th>
                <th className="py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-primary/20">
                <td className="py-3 pl-2 font-semibold text-primary text-left">
                  BMI
                </td>
                <td className="py-3">{data.bmi}</td>
              </tr>
              <tr>
                <td className="py-3 pl-2 font-semibold text-primary text-left">
                  Body Fat
                </td>
                <td className="py-3">{data.bodyfat}</td>
              </tr>
              <tr className="bg-primary/20">
                <td className="py-3 pl-2 font-semibold text-primary text-left">
                  Body Fat Status
                </td>
                <td className="py-3">{data.bodyfat_status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BodyFatCalculator;
