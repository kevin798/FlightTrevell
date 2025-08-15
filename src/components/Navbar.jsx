import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUserName(parsedUser.name || "User");
        } catch {
          setUserName("User");
        }
      }
    }
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  }, [navigate]);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-auto transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Menu navigasi */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/pesawat" className="nav-link">Pesawat</Link>
            <Link to="/hotel" className="nav-link">Hotel</Link>
            <Link to="#" className="nav-link">Transportasi</Link>
          </div>

          {/* Login/Register atau Profile */}
          <div className="flex items-center space-x-4 relative">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="btn-outline"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="btn-primary"
                >
                  Register
                </button>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <div
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full cursor-pointer select-none"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Lihat Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;