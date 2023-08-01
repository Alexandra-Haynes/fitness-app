import { useState } from "react";
import axios from "axios";

const fetchCaloricNeeds = async (height, body_frame, gender, formula) => {
  const { data } = await axios.get(
    "https://health-calculator-api.p.rapidapi.com/ibw",
    {
      headers: {
        "X-RapidAPI-Key": "7fe9b1ed76msha35f8532c12af1fp1a55d7jsncc554e99d95b",
        "X-RapidAPI-Host": "health-calculator-api.p.rapidapi.com",
      },
      params: { height, body_frame, gender, formula },
    }
  );
  return data;
};

function DailyCaloricNeedsCalculator() {
  const [height, setHeight] = useState("70");
  const [body_frame, setBodyFrame] = useState("medium");
  const [gender, setGender] = useState("male");
  const [formula, setFormula] = useState("hamwi");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateCaloricNeeds = async () => {
    setLoading(true);
    setError(null);
    try {
      const caloricNeedsData = await fetchCaloricNeeds(
        height,
        body_frame,
        gender,
        formula
      );
      setData(caloricNeedsData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className=" w-[90%] mx-auto flex flex-col items-start justify-center
     gap-6  p-8 max-w-[800px]">
      <h1 className="text-3xl text-slate-500 text-center pb-6">
        Daily Caloric Needs Calculator
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateCaloricNeeds();
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
            className="text-xl ml-2 mr-2 font-mono w-[80px] text-center
            focus:bg-highlights bg-highlights/80 py-1 rounded-full"
          />
          in
        </label>
        <label className="font-semibold">
          Body Frame:
          <select
            value={body_frame}
            onChange={(e) => setBodyFrame(e.target.value)}
            className="ml-2 bg-highlights rounded-full p-1 w-[140px] text-center"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

       
        <button
          type="submit"
          className="bg-primary p-4 rounded-full shadow-xl text-white text-center
          hover:bg-primary/80 hover:translate-y-1 px-8"
        >
          Calculate
        </button>
      </form>

      {loading && (
        <div className=" flex flex-col items-center justify-center mx-auto h-[300px]">
          <p className="text-primary text-xl text-center">Loading ...</p>
          <video
            src="/assets/loadingIcon.mp4"
            autoPlay
            muted
            className="h-[50px] w-auto"
          ></video>
        </div>
      )}
      {error && (
        <p className="text-xl text-center">An error has occurred: {error}</p>
      )}
      {data &&  (
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
                  Caloric Needs
                </td>
                <td className="py-3">{data.caloric_needs.calories}</td>
              </tr>
              <tr className="bg-primary/20">
                <td className="py-3 pl-2 font-semibold text-primary text-left">
                  Used Equation
                </td>
                <td className="py-3">{data.caloric_needs.equation}</td>
              </tr>
              <tr className="bg-primary/20">
                <td className="py-3 pl-2 font-semibold text-primary text-left">
                  Goal
                </td>
                <td className="py-3">{data.caloric_needs.goal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DailyCaloricNeedsCalculator;
