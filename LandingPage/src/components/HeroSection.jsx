import React from "react";
import video_1 from "../assets/video_1.mp4";
import video_2 from "../assets/video_2.mp4";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroSection = ({ user }) => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!user) {
      toast.error("You must be logged in to start the mock interview.");
    } else {
      navigate("/start-mock-interview");
    }
  };
  return (
    <div className="flex flex-col items-center mt-1 lg-mt-20">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center tracking-wide">
        <i>Practice Smart. </i>
        <span>
          <i className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            Speak Bold. Ace Interviews.
          </i>
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        An AI-powered mock interview platform with voice interaction and instant
        feedback.
      </p>
      <div className="flex justify-center my-10">
        <button
          onClick={handleStartClick}
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md text-white cursor-pointer hover:from-orange-800 hover:to-orange-800 transition duration-300"
        >
          Start Mock Interview
        </button>
        <a href="#howitworks" className="py-3 px-4 mx-3 rounded-md border">
          How It Works
        </a>
      </div>
      <div className="flex flex-mt-10 justify-center">
        <video
          src={video_1}
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-500 shadow-orange-400 mx-2 my-4"
        >
          <source src={video_1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          src={video_2}
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-500 shadow-orange-400 mx-2 my-4"
        >
          <source src={video_2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default HeroSection;
