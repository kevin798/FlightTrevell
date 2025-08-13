import React from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const Flights = () => {
  const flights = [
    {
      id: "FL001",
      airline: "Garuda Indonesia",
      from: "Jakarta (CGK)",
      to: "Bali (DPS)",
      departure: "08:00",
      arrival: "10:30",
      price: 1500000,
      status: "Aktif",
    },
    {
      id: "FL002",
      airline: "Lion Air",
      from: "Surabaya (SUB)",
      to: "Medan (KNO)",
      departure: "09:15",
      arrival: "11:45",
      price: 1200000,
      status: "Aktif",
    },
    {
      id: "FL003",
      airline: "Citilink",
      from: "Bandung (BDO)",
      to: "Yogyakarta (JOG)",
      departure: "10:30",
      arrival: "11:45",
      price: 800000,
      status: "Penuh",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Manajemen Penerbangan
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Penerbangan
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Cari penerbangan..."
            className="border rounded-lg px-4 py-2"
          />
          <select className="border rounded-lg px-4 py-2">
            <option value="">Semua Maskapai</option>
            <option value="garuda">Garuda Indonesia</option>
            <option value="lion">Lion Air</option>
            <option value="citilink">Citilink</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="full">Penuh</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>
      </div>

      {/* Flights Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Maskapai
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Dari
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Ke
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Berangkat
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Tiba
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flights.map((flight) => (
              <tr key={flight.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{flight.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {flight.airline}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {flight.from}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{flight.to}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {flight.departure}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {flight.arrival}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  Rp {flight.price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      flight.status === "Aktif"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {flight.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Menampilkan 1 - 3 dari 50 penerbangan
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flights;
