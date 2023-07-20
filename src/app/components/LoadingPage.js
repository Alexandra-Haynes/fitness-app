import React, { useEffect } from "react";

const LoadingPage = () => {
  useEffect(() => {
    const video = document.getElementById("video");
    const smallVideoSrc = "/assets/intro.mp4";
    const bigVideoSrc = "/assets/introBigScreens.mp4";

    const handleResize = () => {
      if (window.innerWidth >= 769) {
        video.src = bigVideoSrc;
      } else {
        video.src = smallVideoSrc;
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen w-full bg-primary flex items-center justify-center">
      <video autoPlay loop muted width="100%" height="100%" id="video">
        <source
          src=""
          type="video/mp4"
        
        />
        {/* <source
          src="/assets/intro.mp4"
          type="video/mp4"
          media="(max-width: 768px)"
        /> */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LoadingPage;
