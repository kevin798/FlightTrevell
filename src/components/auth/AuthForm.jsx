import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import backgroundImage from '../../assets/kota.jpeg';


const AuthForm = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleLoginSuccess = () => {
    console.log('Login berhasil!');
  };

  const handleRegisterSuccess = () => {
    setIsRegisterMode(false);
    console.log('Registrasi berhasil!');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-gray-900 text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
       <div
        className={`bg-black bg-opacity-50 rounded-lg w-full max-w-md relative transition-all duration-500 overflow-hidden ${
          isRegisterMode ? 'h-[550px]' : 'h-[450px]'
        }`}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
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
