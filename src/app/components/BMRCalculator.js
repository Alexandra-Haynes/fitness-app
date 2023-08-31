import { useState } from "react";

import ErrorMessage from "./ErrorMessage";
import LoadingGif from "./LoadingGif";

const fetchBMR = async (age, weight, height, gender, equation) => {
  const response = await fetch("/api/calculateBMR", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ age, weight, height, gender, equation }),
  });

  const data = await response.json();
  return data;
};


function BasalMetabolicRate() {
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("132"); // in pounds
  const [height, setHeight] = useState("69"); // in inches
  const [gender, setGender] = useState("male");
  const [equation, setEquation] = useState("mifflin");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateBMR = async () => {
    setLoading(true);
    setError(null);
    try {
      const bmrData = await fetchBMR(age, weight, height, gender, equation);
      setData(bmrData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl text-slate-500 text-center pb-6">
        BMR Calculator
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateBMR();
        }}
        className="bg-white border w-[90%] mx-auto 
      flex flex-col items-start justify-center gap-6
      rounded-md shadow-xl p-8 max-w-[600px]"
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
            className="text-xl ml-2 mr-2 font-mono w-[80px] text-center
            focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          />
          in
        </label>
        <label className="font-semibold">
          Weight:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="text-xl ml-2 mr-2 font-mono w-[80px] text-center
            focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          />
          lbs
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
        <label className="font-semibold">
          Equation:
          <select
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            className="ml-2"
          >
            <option value="mifflin">Mifflin-St Jeor</option>
            <option value="harris">Harris-Benedict</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-primary p-4 rounded-full shadow-xl text-white text-center
          hover:bg-primary/80 hover:translate-y-1 px-8"
        >
          Calculate BMR
        </button>
      </form>
      {loading && <LoadingGif />}
      {error && <ErrorMessage />}

      {data && (
        <div
          className="bg-white border w-[90%] max-w-[600px] mx-auto 
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
                  BMR
                </td>
                <td className="py-3">{data.bmr}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BasalMetabolicRate;
