import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
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

    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log('Data login:', data); // Debugging

      if (res.ok) {
        setSuccess('Login berhasil!');

        // Simpan token dan role
        localStorage.setItem('token', data.token || '');
        localStorage.setItem('role', data.role || 'user');

        onLoginSuccess?.();

        // Cek role admin (case-insensitive)
        if (data.role?.toLowerCase() === 'Admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Username atau password salah.');
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
      <h2 className="text-3xl font-bold text-center mb-6 text-white">LOGIN</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="loginEmail" className="block text-sm font-medium mb-2 text-gray-400">
            Email
          </label>
          <input
            type="text"
            id="loginEmail"
            className={inputClasses}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="loginPassword" className="block text-sm font-medium mb-2 text-gray-400">
            Password
          </label>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="loginPassword"
            className={inputClasses}
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
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
          Log in
        </button>
      </form>

      <p className="text-center mt-4 text-gray-400">
        Belum punya akun?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-blue-500 hover:underline"
        >
          Register di sini
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
