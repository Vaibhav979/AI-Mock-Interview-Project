import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="max-w-7xl flex flex-col mx-auto px-8">
      <div className="max-w-7xl py-5 px-10 text-left flex justify-between pr-{8}">
        <div className="w-1/3 flex flex-col gap-6">
          <div className="flex justify-start mb-2">
            <a
              href=""
              className="flex justify-center items-center gap-3.5 text-2xl"
            >
              <img src={logo} alt="" className="h-10 w-10" />
              IntervU
            </a>
          </div>
          <p className="text-xl">
            <i>Practice Smart. </i>
            <span>
              <i className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
                Speak Bold. Ace Interviews.
              </i>
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-24 px-4 py-8 pt-8">
          <div>
            <div className="text-[1.05rem] font-bold text-[var(--text-color)] mb-2">
              Quick links
            </div>
            <ul className="flex flex-col gap-5">
              <li>
                <a href="" className="text-[#777] text-[0.9rem]">
                  Home
                </a>
              </li>
              <li>
                <a href="#howitworks" className="text-[#777] text-[0.9rem]">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="text-[#777] text-[0.9rem]">
                  Features
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-gray-500 text-xs pb-8 mt-6 border-t border-gray-300 pt-5 text-center">
        © 2025 - Present IntervU. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
