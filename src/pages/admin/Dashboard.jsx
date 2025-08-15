import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFlights: 0,
    totalTransactions: 0,
    latestFlights: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/api/dashboard/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Fetch dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return <p className="p-6">Loading data...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm">Total Pengguna</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm">Total Penerbangan</h2>
          <p className="text-3xl font-bold text-green-600">{stats.totalFlights}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-500 text-sm">Transaksi Bulan Ini</h2>
          <p className="text-3xl font-bold text-purple-600">{stats.totalTransactions}</p>
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
            {(stats.latestFlights || []).map((flight) => (
              <tr key={flight.id}>
                <td className="border p-2">{flight.code}</td>
                <td className="border p-2">{flight.origin}</td>
                <td className="border p-2">{flight.destination}</td>
                <td className="border p-2">{flight.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!stats.latestFlights || stats.latestFlights.length === 0) && (
          <p className="text-gray-500 mt-4">Tidak ada data penerbangan terbaru.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
