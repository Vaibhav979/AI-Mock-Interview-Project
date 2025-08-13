import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StartMockInterview from "./components/StartMockInterview.jsx";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/start-mock-interview",
    element: <StartMockInterview />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
