import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm">Total Pengguna</h2>
          <p className="text-3xl font-bold text-blue-600">1,250</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm">Total Penerbangan</h2>
          <p className="text-3xl font-bold text-green-600">320</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm">Transaksi Bulan Ini</h2>
          <p className="text-3xl font-bold text-purple-600">850</p>
        </div>
      </div>

      {/* Tabel Data Penerbangan */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Daftar Penerbangan Terbaru</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Kode Penerbangan</th>
              <th className="border p-2 text-left">Asal</th>
              <th className="border p-2 text-left">Tujuan</th>
              <th className="border p-2 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">FL-001</td>
              <td className="border p-2">Jakarta</td>
              <td className="border p-2">Bali</td>
              <td className="border p-2">2025-08-15</td>
            </tr>
            <tr>
              <td className="border p-2">FL-002</td>
              <td className="border p-2">Surabaya</td>
              <td className="border p-2">Medan</td>
              <td className="border p-2">2025-08-16</td>
            </tr>
            <tr>
              <td className="border p-2">FL-003</td>
              <td className="border p-2">Bandung</td>
              <td className="border p-2">Makassar</td>
              <td className="border p-2">2025-08-17</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
