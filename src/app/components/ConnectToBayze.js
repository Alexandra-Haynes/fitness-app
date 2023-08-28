'use client'
import React from "react";


const ConnectToBayze = () => {
  const handleConnect = async () => {
    try {
      const res = await fetch("/api/connectToBayze");
      const data = await res.json();

      if (data.success) {
        // Do something with data.badges here
      } else {
        console.error("Failed to connect to Bayze");
      }
    } catch (error) {
      console.error("Error connecting to Bayze:", error);
    }
  };
  return (
    <div
      className="bg-highlights px-6 py-2 my-6 rounded-lg
    text-center shadow-lg hover:shadow-xl hover:translate-y-1 transition-all
    ease-in-out"
    >
      <a onClick={handleConnect} href="#">
        Connect to Bayze
      </a>
    </div>
  );
};

export default ConnectToBayze;


