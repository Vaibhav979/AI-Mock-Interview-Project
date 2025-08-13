import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StartMockInterview from "./components/StartMockInterview.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/start-mock-interview",
    element: (
      <div>
        <Navbar />
        <StartMockInterview />
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
