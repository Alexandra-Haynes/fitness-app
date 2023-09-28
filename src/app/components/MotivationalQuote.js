import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GrFormClose } from "react-icons/gr";
import { Dancing_Script } from "next/font/google";

const dancingFont = Dancing_Script({
  weight: '400',
  subsets: ['latin']
})


const MotivationalQuote = () => {
  const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "Strive for progress, not perfection.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "Success is what comes after you stop making excuses.",
    "The only person you are destined to become is the person you decide to be.",
    "You don't have to be great to start, but you have to start to be great.",
    "Sweat is magic. Cover yourself in it daily to grant your wishes.",
    "The difference between try and triumph is a little umph.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "Don't stop when you're tired; stop when you're done.",
  ];

  const [quote, setQuote] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  const fetchQuote = () => {
    // Randomly select a quote from the array
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  };

  const closePopup = () => {
    setShowPopup(false);
    let box = document.getElementById("textBox");
    box.style.display = "none";
  };

  // useEffect(() => {
  //   fetchQuote();
  // }, []);

  return (
    <div
      className={`absolute bottom-0 right-0 left-0 mx-auto mb-4 animate-slide-in-right p-4 
    text-myWhite w-[400px]  h-fit min-h-[120px] rounded-md  hover:border-primary hover:bg-white/10
    ${dancingFont.className}`}
      id="textBox"
    >
      {showPopup && (
        <div >
          <div className="">
            <h2 className="underline underline-offset-2  text-black mb-4">
              Quote of the day
            </h2>
            <p className="text-lg mr-6">{quote}</p>

            <button
              onClick={closePopup}
              className="text-right underline absolute top-2 right-2 rounded-full
            hover:scale-110 hover:bg-highlights "
            >
              <GrFormClose />
            </button>
          </div>
          <Image
            src="/assets/quotes.png"
            height={80}
            width={80}
            alt='quotes icon'
            className="absolute -right-6 -bottom-0"
          />
        </div>
      ) }
    </div>
  );
};

export default MotivationalQuote;
