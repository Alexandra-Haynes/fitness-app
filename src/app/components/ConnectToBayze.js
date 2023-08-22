'use client'
import React from "react";

const ConnectToBayze = () => {
console.log('Connecting to Bayze...')

  const handleConnect = async () => {
    const appId = ""; 
    const url = "https://gemsapi.bayz.ai/user/init";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log('Connected to Bayze', data);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };

  return (
    <div className="bg-highlights px-6 py-2 my-6 rounded-lg 
    text-center shadow-lg hover:shadow-xl hover:translate-y-1 transition-all
    ease-in-out">
      <a onClick={handleConnect} href="#">
        Connect to Bayze
      </a>
    </div>
  );
};

export default ConnectToBayze;
