import React from "react";
import { Link } from "react-router-dom";
import { howItWorks } from "../constants";

const HowItWorks = () => {
  return (
    <div
      className="relative mt-15 border-b border-neutral-800 min-h-[400px]"
      id="howitworks"
    >
      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          how it works
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-7 lg:mt-14 tracking wide">
          Speak, assess,
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            {" "}
            improve — in seconds
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {howItWorks.map((how, index) => (
          <div key={index} className="w-full sm:1/1 lg:w-1/3">
            <div className="flex">
              <div className="flex h-10 w-10 mx-6 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                {how.icon}
              </div>
              <div className="mt-1 mb-6 text-xl">
                <h5>{how.title}</h5>
                <p className="text-md p-2 mb-4 text-neutral-500">
                  {how.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-10">
        <Link
          to="/start-mock-interview"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md "
        >
          Start Mock Interview
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
