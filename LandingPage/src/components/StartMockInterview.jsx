import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const StartMockInterview = () => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/generate-questions",
        {
          role,
          skills,
        }
      );

      setQuestions(response.data.questions || []); // Adjust depending on backend response format
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      {/* modified navbar */}
      {/* <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
          <div className="flex items-center justify-between px-6">
            <Link to="/">
              <div className="flex items-center flex-shrink-0">
                <img className="h-10 w-10 mr-2" src={logo} alt="" />
                <span className="text-xl tracking-tight">IntervU</span>
              </div>
            </Link>
          </div>
        </div>
      </nav> */}
      {/* navbar ends */}

      <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl shadow-md">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl tracking-wide">
          Start Your{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            Mock Interview
          </span>
        </h2>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block font-medium">Role:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Java Developer"
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="block font-medium">Skills:</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., Java, Spring Boot, DSA"
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </form>

        {questions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Generated Questions:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {questions.map((q, index) => (
                <li key={index}>{q}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartMockInterview;
