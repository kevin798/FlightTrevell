import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Nama wajib diisi.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Email tidak valid.');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password minimal 6 karakter.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/auth/registrasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess('Registrasi berhasil!');
        onRegisterSuccess();
      } else {
        setError(data.message || 'Gagal registrasi.');
      }
    } catch (err) {
      setError('Gagal menghubungi server.');
    }
  };

  const inputClasses =
    'w-full px-0 py-2 text-gray-300 bg-transparent border-b border-blue-400 focus:outline-none focus:border-blue-600 dark:text-gray-300';
  const buttonClasses =
    'w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-300 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1';

  return (
    <div className="p-8">
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
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-400">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            className={inputClasses}
            placeholder="Nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="registerEmail" className="block text-sm font-medium mb-2 text-gray-400">
            Email
          </label>
          <input
            type="email"
            id="registerEmail"
            className={inputClasses}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="registerPassword" className="block text-sm font-medium mb-2 text-gray-400">
            Password
          </label>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="registerPassword"
            className={inputClasses}
            placeholder="******"
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
              <EyeSlashIcon className="h-5 w-5 text-gray-300" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div>

        <button type="submit" className={buttonClasses}>
          Register
        </button>
      </form>

      <p className="text-center mt-4 text-gray-400">
        Sudah punya akun?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-400 hover:underline focus:outline-none"
        >
          Login di sini
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
