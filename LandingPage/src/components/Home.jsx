import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Footer from "./Footer";

const Home = ({user}) => {
  return (
    <div className="max-w-7xl mx-auto pt-10 px-6">
      <HeroSection user={user}/>
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
