import React from "react";


const BodyPart = ({ item, setBodyPart, bodyPart }) => (
  <div
    className={`text-red-600 ${
      bodyPart === item
        ? " text-highlights w-fit  cursor-pointer gap-2"
        : "bg-white  w-12 h-4 cursor-pointer gap-2"
    }`}
    onClick={() => {
      setBodyPart(item);
      window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
    }}
  >
    {item === "all" && (
      <img src="/assets/all.png" />
    )}

    <span
      className="text-md font-semibold font-mono text-gray-800 
    uppercase"
    >
      {item}
    </span>
  </div>
);


export default BodyPart;
