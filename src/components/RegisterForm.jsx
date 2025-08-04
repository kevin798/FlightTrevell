import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isValidEmail(email)) {
      setError('Email tidak valid.');
      return;
    }
    if (!isValidPassword(password)) {
      setError('Password minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    setTimeout(() => {
      setSuccess('Registrasi berhasil! Silakan login.');
      onRegisterSuccess();
    }, 1000);
  };

  // Menyesuaikan inputClasses agar sama dengan LoginForm
  const inputClasses = "w-full px-0 py-2 text-gray-300 bg-transparent border-b border-purple-400 focus:outline-none focus:border-purple-600";
  // Menyesuaikan buttonClasses agar sama dengan LoginForm (menggunakan ungu)
  const buttonClasses = "w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-300 bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1";

  return (
    <div className="p-8">
      {/* Menyesuaikan judul agar sama dengan LoginForm */}
      <h2 className="text-3xl font-bold text-center mb-6 text-white">REGISTER</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 animate-fadeIn">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 animate-fadeIn">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {/* Menyesuaikan label agar sama dengan LoginForm */}
          <label htmlFor="registerEmail" className="block text-sm font-medium mb-2 text-gray-400">Email</label>
          <input
            type="email"
            id="registerEmail"
            className={inputClasses}
            placeholder="email@contoh.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="relative">
          {/* Menyesuaikan label agar sama dengan LoginForm */}
          <label htmlFor="registerPassword" className="block text-sm font-medium mb-2 text-gray-400">Password</label>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="registerPassword"
            className={inputClasses}
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 focus:outline-none"
            aria-label="Toggle password visibility"
          >
            {isPasswordVisible ? (
              // Menyesuaikan ikon agar sama dengan LoginForm
              <EyeSlashIcon className="h-5 w-5 text-gray-300" />
            ) : (
              // Menyesuaikan ikon agar sama dengan LoginForm
              <EyeIcon className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div>
        <div className="relative">
          {/* Menyesuaikan label agar sama dengan LoginForm */}
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-400">Konfirmasi Password</label>
          <input
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            id="confirmPassword"
            className={inputClasses}
            placeholder="Ulangi password Anda"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 focus:outline-none"
            aria-label="Toggle confirm password visibility"
          >
            {isConfirmPasswordVisible ? (

              <EyeSlashIcon className="h-5 w-5 text-gray-300" />
            ) : (

              <EyeIcon className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className={buttonClasses}
        >
          Daftar
        </button>
      </form>

      <p className="text-center mt-4 text-gray-400">
        Sudah punya akun?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-purple-300 hover:underline focus:outline-none"
        >
          Masuk
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;