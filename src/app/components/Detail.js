import React from "react";

import BodyPartImage from "../assets/all.png";
import TargetImage from "../assets/all.png";
import EquipmentImage from "../assets/all.png";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <div className="flex gap-60 flex-col lg:flex-row items-center p-20px">
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <div className="flex flex-col gap-35px xs:gap-20px">
        <h1 className="text-6xl xs:text-30px font-bold capitalize">{name}</h1>
        <p className="text-2xl xs:text-18px text-gray-700">
          Exercises keep you strong. <span className="capitalize">{name}</span>{" "}
          bup is one of the best <br /> exercises to target your {target}. It
          will help you improve your <br /> mood and gain energy.
        </p>
        {extraDetail?.map((item) => (
          <div key={item.name} className="flex items-center gap-24px">
            <button className="bg-cream-light rounded-full w-100px h-100px">
              <img src={item.icon} alt={bodyPart} className="w-50px h-50px" />
            </button>
            <p className="text-3xl xs:text-20px capitalize">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
