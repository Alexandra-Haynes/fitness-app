import React from 'react'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const LoadingGif = () => {
  return (
    <div
      className=" bg-white border w-[90%] max-w-[600px] mx-auto 
  rounded-md shadow-xl p-6 my-12 flex flex-col items-center justify-center gap-4"
    >
      <div className='flex flex-row items-center justify-center gap-2 animate-pulse'>
        <p className="text-slate-700 text-xl text-center">Loading ...</p>
        <AiOutlineLoading3Quarters className="text-xl text-secondary animate-spin" />
      </div>

      <video
        src="/assets/loadingIcon.mp4"
        autoPlay
        muted
        className="h-[50px] w-auto"
      ></video>
    </div>
  );
}

export default LoadingGif
