import { useState } from "react";
import axios from "axios";

const fetchBMI = async (height, weight) => {
  const { data } = await axios.get(
    "https://health-calculator-api.p.rapidapi.com/bmi/imperial",
    {
      headers: {
        "X-RapidAPI-Key": "7fe9b1ed76msha35f8532c12af1fp1a55d7jsncc554e99d95b",
        "X-RapidAPI-Host": "health-calculator-api.p.rapidapi.com",
      },
      params: { height, weight },
    }
  );
  return data;
};

function BodyMassIndex() {
  const [height, setHeight] = useState("65");
  const [weight, setWeight] = useState("150");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateBMI = async () => {
    setLoading(true);
    setError(null);
    try {
      const bmiData = await fetchBMI(height, weight);
      setData(bmiData);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl text-slate-500 text-center pb-6">
        BMI Calculator
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateBMI();
        }}
        className="bg-white border w-[90%] mx-auto 
      flex flex-col items-start justify-center gap-6
      rounded-md shadow-xl p-8 max-w-[800px]"
      >
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
        <button
          type="submit"
          className="bg-primary p-4 rounded-full shadow-xl text-white text-center
          hover:bg-primary/80 hover:translate-y-1 px-8"
        >
          Calculate BMI
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
                  Weight Status
                </td>
                <td className="py-3">{data.weight_status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BodyMassIndex;
