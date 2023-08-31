import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 animate-pulse">
      <AiOutlineLoading3Quarters className="text-2xl text-secondary animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
