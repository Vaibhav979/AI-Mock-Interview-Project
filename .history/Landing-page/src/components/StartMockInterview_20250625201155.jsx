import React, { useState } from "react";
import axios from "axios";

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
        "http://localhost:8080/api/generateQuestions",
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
    modified navbar 
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-black rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Start Your Mock Interview
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
  );
};

export default StartMockInterview;
