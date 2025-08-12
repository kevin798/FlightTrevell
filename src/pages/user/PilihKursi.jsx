import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressStep from "../../components/ProgressStep";

const PilihKursi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight } = location.state || {};

  const steps = ["Pilih Tiket", "Pilih Kursi", "Pembayaran"];
  const [selectedSeat, setSelectedSeat] = useState(null);

  const seats = [
    "1A", "1B", "1C", "1D",
    "2A", "2B", "2C", "2D",
    "3A", "3B", "3C", "3D",
    "4A", "4B", "4C", "4D",
  ];

  const handleNext = () => {
    if (!selectedSeat) {
      alert("Silakan pilih kursi terlebih dahulu!");
      return;
    }
    navigate("/pembayaran", { state: { flight, seat: selectedSeat } });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProgressStep steps={steps} currentStep={1} />

      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Pilih Kursi untuk {flight?.airline} - {flight?.code}
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => setSelectedSeat(seat)}
            className={`py-4 rounded-lg font-bold ${
              selectedSeat === seat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {seat}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Kembali
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Lanjut ke Pembayaran
        </button>
      </div>
    </div>
  );
};

export default PilihKursi;
