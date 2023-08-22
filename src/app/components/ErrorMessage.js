import React, { useState } from "react";
import Image from "next/image";

const ErrorMessage = ({ errorText }) => {
      const [showError, setShowError] = useState(true);
      if (!showError) return null;

      if(!errorText) errorText='An error has occurred. We apologize for the inconvenience. Please try again in a few minutes.'

  return (
    <div
      className="w-[80%] border border-dashed border-red-300 p-12 bg-red-400/20
        flex flex-row gap-2 items-center justify-center  mx-auto mt-12 rounded-md 
        shadow-lg relative"
    >
      <button
        onClick={() => setShowError(false)}
        className="absolute top-2 right-2 hover:bg-white 
        p-1 rounded-full focus:outline-none transition-all ease-in-out"
      >
        <Image src='/assets/closeIcon.png' width={24} height={24} alt='close icon' />
      </button>
      <Image
        src="/assets/no-results.png"
        width={80}
        height={80}
        className=""
        alt="No result"
      />
      <p className="w-[80%]  text-center">{errorText}</p>
    </div>
  );
};

export default ErrorMessage;
