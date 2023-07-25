'use client'

import React, {useState, useEffect} from "react";
import {  useRouter } from 'next/navigation'; 
import LoadingPage from "./components/LoadingPage";
import HeroBanner from "../app/components/HeroBanner";


const Home = () => {
   const router = useRouter();
     const [isLoading, setIsLoading] = useState(true);

     //delay home page
       useEffect(() => {
         const delay = setTimeout(() => {
           setIsLoading(false);
         }, 1200);
         return () => clearTimeout(delay); // Clear the timeout to avoid memory leaks
       }, []);

  const navigateToExercises = () => {
    router.push("/");
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className=" bg-slate-700 h-screen overflow-x-hidden">
            <div className=" absolute bg-hero opacity-20 w-full h-full
             overflow-hidden bg-cover bg-center">
             
            </div>

            <HeroBanner navigateToExercises={navigateToExercises} />
         
          </div>
          
        </>
      )}
    </>
  );
};

export default Home;
