import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import backgroundImage from "../../assets/kota.jpeg";

const AuthForm = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleLoginSuccess = () => {
    console.log("Login berhasil!");
  };

  const handleRegisterSuccess = () => {
    setIsRegisterMode(false);
    console.log("Registrasi berhasil!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2s"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4s"></div>
      </div>

      {/* Auth container */}
      <div
        className={`relative z-10 bg-white rounded-2xl w-full max-w-md transition-all duration-500 overflow-hidden shadow-2xl border border-gray-100 ${
          isRegisterMode ? "h-[600px]" : "h-[500px]"
        }`}
      >
        {/* Logo or Brand Section */}
        <div className="absolute top-0 left-0 right-0 flex justify-center py-6">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Flight Trevell
          </h1>
        </div>

        <div
          className="flex transition-transform duration-500 ease-in-out mt-16"
          style={{
            transform: `translateX(${isRegisterMode ? "-100%" : "0%"})`,
          }}
        >
          <div className="flex-shrink-0 w-full">
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => setIsRegisterMode(true)}
            />
          </div>

          <div className="flex-shrink-0 w-full">
            <RegisterForm
              onRegisterSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => setIsRegisterMode(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
