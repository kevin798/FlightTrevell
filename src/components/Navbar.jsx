import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-auto transition-transform duration-300 hover:scale-105"
          />

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className="group text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 relative"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link
              to="/pesawat"
              className="group text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 relative"
            >
              Pesawat
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link
              to="/hotel"
              className="group text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 relative"
            >
              Hotel
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link
              to="#"
              className="group text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 relative"
            >
              Transportasi
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
