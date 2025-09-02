import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import StartMockInterview from "./components/StartMockInterview";
import ProtectedRoute from "./components/ProtectedRoute";
import InterviewSession from "./components/InterviewSession";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8080/current-user", {
          credentials: "include",
        });
        if (res.ok) {
          const user = await res.json();
          setUser(user); // Set this in global context or state
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/start-mock-interview"
          element={
            <ProtectedRoute user={user}>
              <StartMockInterview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/interview" element={<InterviewSession />} />
      </Routes>
    </>
  );
}

export default App;
