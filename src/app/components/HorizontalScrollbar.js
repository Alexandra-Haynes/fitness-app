import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import "react-horizontal-scrolling-menu/dist/styles.css";

import ExerciseCard from "./ExerciseCard";
import BodyPart from "./BodyPart";
import IconAll from "./IconAll";

// import RightArrowIcon from "/assets/right-arrow.png";
// import LeftArrowIcon from "/assets/left-arrow.png";

// const LeftArrow = () => {
//   const { scrollPrev } = useContext(VisibilityContext);

//   return (
//     <img src={LeftArrowIcon} alt="right-arrow" onClick={() => scrollPrev()} />
//   );
// };

// const RightArrow = () => {
//   const { scrollNext } = useContext(VisibilityContext);

//   return (
//     <img src={RightArrowIcon} alt="right-arrow" onClick={() => scrollNext()} />
//   );
// };

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  // <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
    {data.map((item) => (
      <div
        key={item.id || item}
        itemId={item.id || item}
        title={item.id || item}
        className="p-4 h-12 w-full bg-green-400"
      >
        {bodyParts ? (
          <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        ) : (
          <>
            <ExerciseCard exercise={item} />
          </>
        )}
      </div>
    ))}
  // </ScrollMenu>;
};

export default HorizontalScrollbar;
