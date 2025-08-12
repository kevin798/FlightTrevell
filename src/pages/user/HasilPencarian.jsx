import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaPlane,
  FaClock,
  FaTag,
  FaUserFriends,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ProgressStep from "../../components/ProgressStep";

const HasilPencarian = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date, passengers } = location.state || {};
  const steps = ["Pilih Tiket", "Pilih Kursi", "Pembayaran"];

  const flights = [
    {
      id: 1,
      airline: "Garuda Indonesia",
      code: "GA-123",
      time: "08:00 - 10:30",
      duration: "2j 30m",
      price: 1200000,
    },
    {
      id: 2,
      airline: "Lion Air",
      code: "JT-456",
      time: "11:00 - 13:15",
      duration: "2j 15m",
      price: 950000,
    },
    {
      id: 3,
      airline: "Citilink",
      code: "QG-789",
      time: "15:30 - 18:00",
      duration: "2j 30m",
      price: 880000,
    },
  ];

  const getFormattedDate = (dateString) => {
    if (!dateString) return "Tanggal tidak diketahui";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
          <ProgressStep steps={steps} currentStep={0} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Hasil Pencarian
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 transition duration-300 font-semibold flex items-center"
        >
          <FaPlane className="mr-2" /> Kembali ke Pencarian
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center md:text-left">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Dari & Ke</p>
              <h3 className="text-lg font-bold text-gray-800">
                {from} → {to}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Tanggal</p>
              <h3 className="text-lg font-bold text-gray-800">
                {getFormattedDate(date)}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaUserFriends className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500 text-sm">Penumpang</p>
              <h3 className="text-lg font-bold text-gray-800">
                {passengers} Orang
              </h3>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
            >
              Ubah
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center transition-transform duration-300 transform hover:scale-[1.01] hover:shadow-2xl"
          >
            <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
              <div className="mr-6">
                <FaPlane className="text-4xl text-blue-600" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {flight.airline}
                  </h3>
                  <p className="text-sm text-gray-500">{flight.code}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaClock className="text-lg" />
                  <p className="font-semibold">{flight.time}</p>
                  <p className="text-sm text-gray-500 ml-2">
                    ({flight.duration})
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right w-full md:w-auto">
              <p className="text-2xl font-extrabold text-blue-600 mb-2">
                Rp {flight.price.toLocaleString("id-ID")}
              </p>
              <button
                onClick={() => navigate("/pilih-kursi", { state: { flight } })}
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition"
              >
                Pilih
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HasilPencarian;
