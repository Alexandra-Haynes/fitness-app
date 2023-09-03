'use client'

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import {RxValueNone} from 'react-icons/rx'
import html2canvas from "html2canvas";

const ProfileIconCustomizer = ({ onSave }) => {
  const [icon, seticon] = useState("assets/avatar/medal.png");
  const [color, setColor] = useState("#ed24ff");
  const [borderRadius, setBorderRadius] = useState(0);
  const [iconSize, setIconSize] = useState(100);
  const [borderSize, setBorderSize] = useState(2);
  const [borderColor, setBorderColor] = useState("#000000");
  const [noBorder, setNoBorder] = useState(false);

  const icons = [
    "medal.png",
    "shoe.png",
    "streak.png",
    "trophy.png",
    "strong.png",
    'gymming.png',
    'trainer.png',
    'spiderman.png',
    
  ];

const generateImageFile = async () => {
  // Get the DOM element you want to capture (e.g., the preview container)
  const previewContainer = document.getElementById("download");

  // Create the canvas using html2canvas
  const canvas = await html2canvas(previewContainer);

  // Convert the canvas to a blob (a file-like object)
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      // Create a File object from the blob
      const file = new File([blob], "avatar.png", { type: "image/png" });

      // Resolve the promise with the file
      resolve(file);
    });
  });
};


const handleDownloadImage = async () => {
  try {
    // Generate the image file (this part will depend on how you're creating the image)
    const imageFile = await generateImageFile();

    // Create a download link for the image
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(imageFile);
    downloadLink.download = "avatar.png"; // Set the filename for the downloaded image
    downloadLink.click();

    // Clean up the object URL to free up memory
    URL.revokeObjectURL(downloadLink.href);
  } catch (error) {
    console.log(error);
    // Handle the error, e.g., show an error message
  }
};

  const handleAddAvatar = async () => {
    // Generate the image file (this part will depend on how you're creating the image)
    const imageFile = await generateImageFile(); // Example function to create the image file

    // Create a FormData object to hold the file
    const formData = new FormData();
    formData.append("avatar", imageFile);
    formData.append("userId", "your-user-id"); // Include user ID if needed

    // Send the POST request to the server
    try {
      const response = await axios.post("/api/upload-avatar", formData);
      // Handle the response, e.g., show a success message
    } catch (error) {
      console.log(error);
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div
      className="px-12 pt-24 flex flex-col 
    md:grid md:grid-cols-2 gap-8 items-center justify-center 
    "
    >
      <div
        id="download"
        className="h-60 w-60 bg-white/40 
        flex flex-col items-center justify-center shadow-md"
      >
        <div
          id="preview-container"
          className={`h-40 w-40 ${
            noBorder ? "border-none" : "border"
          } bg-white shadow-xl flex justify-center items-center`}
          style={{
            borderColor: borderColor,
            borderWidth: `${borderSize}px`,
            borderRadius: `${borderRadius}px`,
            backgroundColor: color,
          }}
        >
          <Image
            id="preview-icon"
            width={12}
            height={12}
            src={icon}
            alt="Selected icon"
            className="absolute"
            style={{ width: `${iconSize}px` }}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-md">
          {icons.map((item, index) => (
            <div
              key={index}
              className={`h-14 w-14 p-1 flex justify-center items-center cursor-pointer ${
                icon === `assets/avatar/${item}`
                  ? "border-2 border-purple-800 rounded-sm"
                  : ""
              }`}
              onClick={() => seticon(`assets/avatar/${item}`)}
            >
              <Image src={`assets/avatar/${item}`} alt={item} height={12} width={12} className="h-12" />
            </div>
          ))}
        </div>

        {/* Color selection */}
        <div className="flex flex-col items-center justify-center gap-2 rounded-md">
          <label htmlFor="color">Background Color:</label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-12 w-12 shadow-lg"
          />
        </div>

        {/* Additional adjustments */}
        <div className="flex flex-col items-center justify-center gap-4">
          <label htmlFor="size">Icon size:</label>
          <input
            type="range"
            id="size"
            min="100"
            max="500"
            step="10"
            value={iconSize}
            onChange={(e) => setIconSize(e.target.value)}
          />

          <label htmlFor="borderRadius">Border radius:</label>
          <input
            type="range"
            id="borderRadius"
            min="0"
            max="100"
            step="1"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
          />

          <label htmlFor="borderSize">Border size:</label>
          <input
            type="range"
            id="borderSize"
            min="0"
            max="10"
            step="1"
            value={borderSize}
            onChange={(e) => setBorderSize(e.target.value)}
          />
          <div className="flex flex-row items-center justify-center gap-2">
            <label htmlFor="borderColor" className="font-semibold">
              Border color:
            </label>
            <input
              type="color"
              id="borderColor"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="h-12 w-12  border-none shadow-md"
            />

            <label
              onClick={() => setNoBorder(!noBorder)}
              className="cursor-pointer flex items-center gap-2"
            >
              {noBorder ? <RxValueNone /> : <RxValueNone />}
            </label>
          </div>
        </div>

        <button
          onClick={handleAddAvatar}
          id="download-button"
          className=" bg-purple-600 mt-4 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow-xl"
        >
          Add Avatar
        </button>
        <button
          onClick={handleDownloadImage}
          className="bg-green-600 mt-2 mb-12 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded shadow-xl"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default ProfileIconCustomizer;
