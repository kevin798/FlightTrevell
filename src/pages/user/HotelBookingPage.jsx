import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa";

const HotelBookingPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lokasi: "",
    checkIn: "",
    checkOut: "",
    tamu: 1,
    kamar: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    localStorage.setItem("hotelSearch", JSON.stringify(formData));
    navigate("/hasil-hotel");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Cari Hotel Impian Anda
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto space-y-6">
          {/* Lokasi */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              <FaMapMarkerAlt className="inline-block mr-2 text-blue-500" />
              Lokasi atau Nama Hotel
            </label>
            <input
              type="text"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              placeholder="Masukkan lokasi atau nama hotel"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tanggal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="inline-block mr-2 text-blue-500" />
                Check-In
              </label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                <FaCalendarAlt className="inline-block mr-2 text-blue-500" />
                Check-Out
              </label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Jumlah Tamu & Kamar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                <FaUsers className="inline-block mr-2 text-blue-500" />
                Jumlah Tamu
              </label>
              <input
                type="number"
                name="tamu"
                value={formData.tamu}
                min="1"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                <FaUsers className="inline-block mr-2 text-blue-500" />
                Jumlah Kamar
              </label>
              <input
                type="number"
                name="kamar"
                value={formData.kamar}
                min="1"
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tombol Cari */}
          <div className="text-center">
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Cari Hotel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingPage;
