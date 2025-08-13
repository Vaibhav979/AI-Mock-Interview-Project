import React, { createContext, useContext, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userInfo = {
        name: decoded.name,
        email: decoded.email,
      };

      setUser(userInfo);
      setIsAuthenticated(true);

      // Save user to backend (Spring Boot)
      await axios.post("http://localhost:8080/api/auth/save-user", {
        email: userInfo.email,
        name: userInfo.name,
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <GoogleOAuthProvider clientId="458730253344-pn65hhjbiemskmpphq7k6bta6o81rrgf.apps.googleusercontent.com">
      <AuthContext.Provider
        value={{ user, isAuthenticated, handleLogout, handleLoginSuccess }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useAuth = () => useContext(AuthContext);
