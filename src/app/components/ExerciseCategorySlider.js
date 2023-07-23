import React from "react";
import Slider from "react-slick";

const ExerciseCategorySlider = ({categories, selectedCategory,  onSelect }) => {
 const settings = {
   dots: true,
   infinite: false,
   speed: 500,
   slidesToShow: 4,
   slidesToScroll: 4,
   initialSlide: 0,
   centerMode: true,
   focusOnSelect: true,
   arrows: true,
   swipeToSlide: true,
   responsive: [
     {
       breakpoint: 1024,
       settings: {
         slidesToShow: 3,
         slidesToScroll: 3,
         infinite: true,
         dots: true,
       },
     },
     {
       breakpoint: 600,
       settings: {
         slidesToShow: 2,
         slidesToScroll: 2,
         initialSlide: 2,
       },
     },
     {
       breakpoint: 480,
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1,
       },
     },
   ],
 };

 <div className="flex snap-mandatory overflow-x-auto bg-green-400 
 w-full h-[300px] mt-24">
   {/* Exercise Type */}

   <Slider {...settings}>
     {categories.map((category) => (
       <div
         key={category.value}
         className={`w-[100px] h-[100px] bg-red-900 flex flex-col items-center justify-center p-2 cursor-pointer snap-center ${
           selectedCategory === category.value ? "border border-red-600" : ""
         }`}
         onClick={() => onSelect(category.value)} // Call the onSelect prop here
       >
         {/* Slide content... */}
       </div>
     ))}
   </Slider>
 </div>;

}

export default ExerciseCategorySlider;