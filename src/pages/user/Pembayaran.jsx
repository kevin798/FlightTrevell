import React, { useState } from "react";
import ProgressStep from "../../components/ProgressStep";


const Pembayaran = () => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const steps = ["Pilih Penerbangan", "Pilih Kursi", "Pembayaran"];

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }
    alert(`Pembayaran berhasil menggunakan ${paymentMethod}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <ProgressStep steps={steps} currentStep={2} />

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Metode Pembayaran</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        {/* Transfer Bank */}
        <label className="flex items-center p-4 border rounded-lg hover:border-blue-600 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="Transfer Bank"
            checked={paymentMethod === "Transfer Bank"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-4"
          />
          <span className="font-medium">Transfer Bank</span>
        </label>

        {/* Kartu Kredit */}
        <label className="flex items-center p-4 border rounded-lg hover:border-blue-600 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="Kartu Kredit/Debit"
            checked={paymentMethod === "Kartu Kredit/Debit"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-4"
          />
          <span className="font-medium">Kartu Kredit/Debit</span>
        </label>

        {/* E-Wallet */}
        <label className="flex items-center p-4 border rounded-lg hover:border-blue-600 cursor-pointer">
          <input
            type="radio"
            name="payment"
            value="E-Wallet"
            checked={paymentMethod === "E-Wallet"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mr-4"
          />
          <span className="font-medium">E-Wallet (OVO, GoPay, Dana, ShopeePay)</span>
        </label>
      </div>

      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default Pembayaran;
