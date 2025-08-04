// src/components/AuthForm.jsx
import React, { useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

// Perbaikan: Path relatif dari AuthForm.jsx ke src/assets/mountain-bg.jpg
import backgroundImage from '../assets/mountain-bg.jpg'; // <-- Perhatikan: `../assets/` bukan `./assets/`

const AuthForm = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const handleLoginSuccess = () => {
    console.log('Login berhasil di AuthForm!');
  };

  const handleRegisterSuccess = () => {
    setIsRegisterMode(false);
    console.log('Registrasi berhasil di AuthForm!');
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} bg-cover bg-center`}
      style={{ backgroundImage: `url(${backgroundImage})` }} // Tetap seperti ini
    >
      <div className={`bg-black bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-70 rounded-lg w-full max-w-md relative transition-all duration-500 overflow-hidden ${isRegisterMode ? 'h-[550px]' : 'h-[450px]'}`}>
        {/* ... sisa kode Anda ... */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 text-gray-800 dark:text-gray-100"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>

        <div
          className={`flex transition-transform duration-500 ease-in-out`}
          style={{ transform: `translateX(${isRegisterMode ? '-100%' : '0%'})` }}
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