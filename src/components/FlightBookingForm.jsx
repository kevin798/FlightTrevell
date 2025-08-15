import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FlightBookingForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAirports = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/public/airports", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal memuat data bandara");
      }
      if (data && data.data) {
        setAirports(data.data);
      } else {
        throw new Error("Format data tidak sesuai");
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message || "Gagal memuat data bandara");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const swapAirports = () => {
    setFormData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.date) {
      setError("Mohon lengkapi semua field yang diperlukan");
      return;
    }
    setIsLoading(true);
    setError("");
    // Simulate API call for navigation
    setTimeout(() => {
      setIsLoading(false);
      navigate("/hasil-pencarian", { state: formData });
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-zinc-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2s"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4s"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-float animation-delay-1s opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-3s opacity-50"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-float animation-delay-5s opacity-30"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/20 w-full max-w-5xl relative z-10 animate-fade-in-up">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-center tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Pesan Tiket Pesawat
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Temukan penerbangan terbaik untuk destinasi impian Anda dengan mudah
            dan cepat.
          </p>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 animate-shake shadow-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From */}
              <div className="group">
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  Dari
                </label>
                <div className="relative">
                  <select
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:outline-none rounded-xl px-4 py-4 text-lg transition-all focus:shadow-xl focus:scale-[1.02] bg-white/70 backdrop-blur-sm appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Pilih bandara asal</option>
                    {airports.map((airport) => (
                      <option key={airport.id} value={airport.code}>
                        {airport.city} ({airport.code}) - {airport.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* To */}
              <div className="group">
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Ke
                </label>
                <div className="relative">
                  <select
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:outline-none rounded-xl px-4 py-4 text-lg transition-all focus:shadow-xl focus:scale-[1.02] bg-white/70 backdrop-blur-sm appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Pilih bandara tujuan</option>
                    {airports.map((airport) => (
                      <option key={airport.id} value={airport.code}>
                        {airport.city} ({airport.code}) - {airport.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Swap Button */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
              <button
                type="button"
                onClick={swapAirports}
                className="w-12 h-12 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-110 hover:rotate-180 flex items-center justify-center group backdrop-blur-sm"
              >
                <svg
                  className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="group">
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                Tanggal Keberangkatan
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getMinDate()}
                className="w-full border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:outline-none rounded-xl px-4 py-4 text-lg transition-all focus:shadow-xl focus:scale-[1.02] bg-white/70 backdrop-blur-sm"
                required
              />
            </div>

            <div className="group">
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                Jumlah Penumpang
              </label>
              <input
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 hover:border-orange-300 focus:border-orange-500 focus:outline-none rounded-xl px-4 py-4 text-lg transition-all focus:shadow-xl focus:scale-[1.02] bg-white/70 backdrop-blur-sm"
                min="1"
                max="9"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${
                isLoading ? "animate-pulse" : ""
              }`}
            >

              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              
              {isLoading ? (
                <div className="flex items-center justify-center relative z-10">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="font-semibold">Mencari Penerbangan...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center relative z-10">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">Cari Penerbangan</span>
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Harga Terbaik Terjamin
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              500+ Maskapai
            </div>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Booking Aman & Mudah
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBookingForm;
