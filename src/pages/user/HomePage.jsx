import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaHotel, FaCarSide } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCariTiket = () => {
    navigate('/pesawat');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Hero Section with Enhanced Styling */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4 text-center shadow-2xl overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2s"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4s"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Destinasi Impian Menanti
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in-up animation-delay-300ms">
            Pesan tiket pesawat, hotel, dan aktivitas dengan mudah.
          </p>
          <button
            onClick={handleCariTiket}
            className="group relative bg-white text-blue-600 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 animate-fade-in-up animation-delay-600ms overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></span>
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Cari Tiket Sekarang
            </span>
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Layanan Unggulan Kami
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Flight Card */}
          <div className="group bg-white rounded-2xl shadow-xl p-8 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up animation-delay-200ms relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left opacity-0 group-hover:opacity-10"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                  <FaPlaneDeparture className="text-5xl text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">Penerbangan</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Temukan dan pesan tiket pesawat ke ribuan destinasi.
              </p>
            </div>
          </div>

          {/* Hotel Card */}
          <div className="group bg-white rounded-2xl shadow-xl p-8 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up animation-delay-400ms relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left opacity-0 group-hover:opacity-10"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-full group-hover:from-green-600 group-hover:to-teal-600 transition-all duration-300">
                  <FaHotel className="text-5xl text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">Hotel</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Booking hotel terbaik dengan harga eksklusif.
              </p>
            </div>
          </div>

          {/* Car Rental Card */}
          <div className="group bg-white rounded-2xl shadow-xl p-8 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-up animation-delay-600ms relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left opacity-0 group-hover:opacity-10"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  <FaCarSide className="text-5xl text-purple-600 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">Sewa Mobil</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Jelajahi kota dengan layanan sewa mobil terpercaya.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <div className="bg-gradient-to-r from-gray-100 via-blue-50 to-indigo-100 py-16 px-4 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2s"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Promo dan Penawaran Spesial
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Promo Card 1 */}
            <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-3 animate-fade-in-up animation-delay-200ms relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden">
                <img src="/placeholder.svg?height=200&width=400&text=Bali+Sunset" alt="Promo Diskon 30%" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                  30% OFF
                </div>
              </div>
              <div className="p-6 relative z-10">
                <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">Diskon 30% Liburan ke Bali</h4>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Nikmati keindahan Bali dengan diskon eksklusif. Berlaku hingga 31 Desember 2025.
                </p>
              </div>
            </div>

            {/* Promo Card 2 */}
            <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-3 animate-fade-in-up animation-delay-400ms relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden">
                <img src="/placeholder.svg?height=200&width=400&text=Jakarta+Hotel" alt="Promo Hotel Hemat" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  HEMAT
                </div>
              </div>
              <div className="p-6 relative z-10">
                <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">Hotel Hemat di Jakarta</h4>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Dapatkan harga terbaik untuk hotel di pusat kota Jakarta.
                </p>
              </div>
            </div>

            {/* Promo Card 3 */}
            <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-3 animate-fade-in-up animation-delay-600ms relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden">
                <img src="/placeholder.svg?height=200&width=400&text=Fast+Train" alt="Promo Kereta Cepat" className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-bounce animation-delay-1s">
                  CEPAT
                </div>
              </div>
              <div className="p-6 relative z-10">
                <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">Tiket Kereta Cepat Jakarta - Bandung</h4>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Perjalanan nyaman dan cepat dengan promo spesial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
