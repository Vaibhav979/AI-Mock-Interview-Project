import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/startMockInterview", element: <StartMockInterview /> },
]);

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-10 px-6">
        <HeroSection />
        <HowItWorks />
        <Features />
        <Footer />
      </div>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
