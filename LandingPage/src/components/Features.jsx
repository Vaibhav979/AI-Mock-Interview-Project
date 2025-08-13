import React from "react";
import { features } from "../constants";

const Features = () => {
  return (
    <div
      className="relative mt-15 border-b border-neutral-800 min-h-[800px]"
      id="features"
    >
      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Features
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-7 lg:mt-14 tracking wide">
          Interview prep made
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            {" "}
            effortless and effective
          </span>
        </h2>
      </div>

      <div className="flex flex-wrap mt-15 lg:mt-20">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:1/1 lg:w-1/3">
            <div className="flex">
              <div className="flex h-10 w-10 mx-6 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                {feature.icon}
              </div>
              <div className="mt-1 mb-6 text-xl">
                <h5>{feature.title}</h5>
                <p className="text-md p-2 mb-20 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
