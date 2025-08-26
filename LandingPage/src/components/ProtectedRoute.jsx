import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ user, children }) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to access this page.");
      setTimeout(() => setRedirect(true), 500); // slight delay for toast to render
    }
  }, [user]);
//   <ToastContainer position="top-center" autoClose={3000} />;

  if (!user && redirect) {
    return <Navigate to="/" replace />;
  }

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
