import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const Flights = () => {
  const [flights, setFlights] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newFlight, setNewFlight] = useState({
    id: "",
    airline: "",
    from: "",
    to: "",
    departure: "",
    arrival: "",
    price: "",
    status: "Aktif",
  });

  const handleChange = (e) => {
    setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFlights([...flights, { ...newFlight, price: Number(newFlight.price) }]);
    setShowForm(false);
    setNewFlight({
      id: "",
      airline: "",
      from: "",
      to: "",
      departure: "",
      arrival: "",
      price: "",
      status: "Aktif",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Manajemen Penerbangan
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
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
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Maskapai</th>
              <th className="px-6 py-3">Dari</th>
              <th className="px-6 py-3">Ke</th>
              <th className="px-6 py-3">Berangkat</th>
              <th className="px-6 py-3">Tiba</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flights.map((flight) => (
              <tr key={flight.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{flight.id}</td>
                <td className="px-6 py-4">{flight.airline}</td>
                <td className="px-6 py-4">{flight.from}</td>
                <td className="px-6 py-4">{flight.to}</td>
                <td className="px-6 py-4">{flight.departure}</td>
                <td className="px-6 py-4">{flight.arrival}</td>
                <td className="px-6 py-4">
                  Rp {flight.price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">{flight.status}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Menampilkan {flights.length} dari {flights.length} penerbangan
        </p>
      </div>

      {/* Modal Tambah Penerbangan */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4">Tambah Penerbangan</h2>
            <input
              name="id"
              placeholder="ID"
              value={newFlight.id}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full mb-2"
            />
            <input
              name="airline"
              placeholder="Maskapai"
              value={newFlight.airline}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full mb-2"
            />
            <input
              name="from"
              placeholder="Dari"
              value={newFlight.from}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full mb-2"
            />
            <input
              name="to"
              placeholder="Ke"
              value={newFlight.to}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full mb-2"
            />
            <input
              name="departure"
              placeholder="Berangkat"
              value={newFlight.departure}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full mb-2"
            />
            <input
              name="arrival"
              placeholder="Tiba"
              value={newFlight.arrival}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full mb-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Harga"
              value={newFlight.price}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full mb-2"
            />
            <select
              name="status"
              value={newFlight.status}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full mb-4"
            >
              <option value="Aktif">Aktif</option>
              <option value="Penuh">Penuh</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Flights;
