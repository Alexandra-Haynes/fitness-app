import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import LoadingGif from "./LoadingGif";


const fetchIdealBodyWeight = async (height, body_frame, gender, formula) => {
  const heightInCm = height / 0.3937; // convert height from inches to cm
  const response = await fetch("/api/calculateIdealBodyWeight", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ height: heightInCm, body_frame, gender, formula }),
  });

  const data = await response.json();
  return data;
};

function IdealBodyWeightCalculator() {
  const [height, setHeight] = useState("70");
  const [bodyFrame, setBodyFrame] = useState("medium");
  const [gender, setGender] = useState("male");
  const [formula, setFormula] = useState("hamwi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateIdealBodyWeight = async () => {

    setLoading(true);
    setError(null);
    try {
      const idealBodyWeightData = await fetchIdealBodyWeight(
        height,
        bodyFrame,
        gender,
        formula
      );
      setData(idealBodyWeightData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl text-slate-500 text-center pb-6">
        Ideal Body Weight Calculator
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateIdealBodyWeight();
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
          Body Frame:
          <select
            value={bodyFrame}
            onChange={(e) => setBodyFrame(e.target.value)}
            className="text-xl ml-2 font-mono w-[140px] text-center
            focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <label className="font-semibold">
          Formula:
          <select
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            className="text-xl ml-2 font-mono w-[140px] text-center
            focus:bg-highlights bg-highlights/80 py-1 px-2 rounded-full"
          >
            <option value="hamwi">Hamwi</option>
            <option value="devine">Devine</option>
            <option value="robinson">Robinson</option>
            <option value="miller">Miller</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-primary p-4 rounded-full shadow-xl text-white text-center
          hover:bg-primary/80 hover:translate-y-1 px-8"
        >
          Calculate Ideal Body Weight
        </button>
      </form>
      {loading && <LoadingGif />}
      {error && <ErrorMessage />}
      {data && (
        <div
          className="bg-white border w-[90%] max-w-[600px] mx-auto 
  rounded-md shadow-xl p-6 my-12"
        >
          <table className="w-full text-center">
            <thead>
              <tr className="border-b-2 border-b-highlights">
                <th className="py-3 pl-2 text-left">Parameter</th>
                <th className="py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-primary/20">
                <td className="py-3 pl-2 font-semibold text-primary text-left">
                  Ideal Weight
                </td>
                <td className="py-3">{data.ideal_weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default IdealBodyWeightCalculator;
