import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const StartMockInterview = () => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const generatedQuestions = response.data.questions || [];
      navigate("/interview", { state: { questions: generatedQuestions } });
      // setQuestions(response.data.questions || []); // Adjust depending on backend response format
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Try again.");
    }

    setLoading(false);
  };

  return (
    <div>
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
      </div>
    </div>
  );
};

export default StartMockInterview;
