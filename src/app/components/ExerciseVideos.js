import React from "react";
import Loader from "./Loader";

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length) return <Loader />;

  return (
    <div className="mt-20px p-20px">
      <h2 className="font-bold text-4xl xs:text-25px mb-33px">
        Watch <span className="text-red-600 capitalize">{name}</span> exercise
        videos
      </h2>
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-110px justify-start flex-wrap items-center">
        {exerciseVideos.slice(0, 3).map((item, index) => (
          <a
            key={index}
            className="exercise-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="rounded-tl-lg"
              src={item.video.thumbnails[0].url}
              alt={item.video.title}
            />
            <div>
              <h3 className="font-semibold text-2xl xs:text-18px">
                {item.video.title}
              </h3>
              <p className="text-sm text-black">{item.video.channelName}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ExerciseVideos;
