import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const Navbar = ({ user, setUser }) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const handleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: idToken }),
      });

      if (!res.ok) throw new Error("Failed to authenticate");
      const data = await res.json();
      setUser(data); // This will update App.jsx user state
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/"; // Redirect to home after logout
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
    }
  };

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex items-center justify-between px-6">
          <Link to="/">
            <div className="flex items-center flex-shrink-0">
              <img className="h-10 w-10 mr-2" src={logo} alt="" />
              <span className="text-xl tracking-tight">IntervU</span>
            </div>
          </Link>
          <ul className="hidden lg:flex ml-14 space-x-12 ">
            {navItems.map((item, index) => (
              <li className="hover:text-orange-500" key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          {!user ? (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                try {
                  handleLoginSuccess(credentialResponse);
                } catch (error) {
                  console.error("JWT Decode error:", error);
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          ) : (
            <div className="flex items-center gap-3 text-white">
              <img
                src={user.picture || "default-avatar.png"}
                alt="Profile"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <span>{user.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="ml-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="lg:hidden md:flex flex-col justify-end">
          <button onClick={toggleNavbar}>
            {mobileDrawerOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileDrawerOpen && (
        <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="py-4 hover:text-orange-500">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          {!user ? (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                try {
                  handleLoginSuccess(credentialResponse);
                } catch (error) {
                  console.error("JWT Decode error:", error);
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          ) : (
            <div className="flex items-center gap-3 text-white">
              <img
                src={user.picture || "default-avatar.png"}
                alt="Profile"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <span>{user.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="ml-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-500 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
