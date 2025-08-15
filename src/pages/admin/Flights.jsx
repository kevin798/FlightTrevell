import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import axios from "axios";

const Flights = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "http://localhost:8000/api/public/flights"
      );
      if (response.data.meta.code === 200) {
        setFlights(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch flights data");
      console.error("Error fetching flights:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAirports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/public/airports"
      );
      if (response.data.meta.code === 200) {
        setAirports(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching airports:", err);
      setError(err.response?.data?.message || "Failed to fetch airports data");
    }
  };

  useEffect(() => {
    fetchFlights();
    fetchAirports();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus penerbangan ini?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/flights/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.meta.code === 200) {
          await fetchFlights(); // Refresh the flights list
        }
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus penerbangan");
        console.error("Error deleting flight:", err);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/flights/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.meta.code === 200) {
        setNewFlight(response.data.data);
        setShowForm(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data penerbangan");
      console.error("Error fetching flight details:", err);
    }
  };

  // Dummy data for initial state
  const [dummyFlights, setDummyFlights] = useState([
    {
      id: 1,
      airline: "Garuda Indonesia",
      flight_number: "GA123",
      origin: {
        id: 1,
        code: "CGK",
        name: "Soekarno-Hatta International Airport",
        city: "Jakarta",
        country: "Indonesia",
      },
      destination: {
        id: 3,
        code: "SUB",
        name: "Juanda International Airport",
        city: "Surabaya",
        country: "Indonesia",
      },
      departure_time: "2025-08-20 08:00:00",
      arrival_time: "2025-08-20 10:00:00",
      price: "1500000.00",
      available_seats: 170,
      classes: [
        {
          id: 1,
          name: "ekonomi",
          price: "1500000.00",
          available_seats: 100,
        },
        {
          id: 2,
          name: "bisnis",
          price: "3000000.00",
          available_seats: 50,
        },
        {
          id: 3,
          name: "first class",
          price: "5000000.00",
          available_seats: 20,
        },
      ],
    },
    {
      id: 2,
      airline: "Citilink",
      flight_number: "QG456",
      origin: {
        id: 2,
        code: "DPS",
        name: "Ngurah Rai International Airport",
        city: "Denpasar",
        country: "Indonesia",
      },
      destination: {
        id: 3,
        code: "SUB",
        name: "Juanda International Airport",
        city: "Surabaya",
        country: "Indonesia",
      },
      departure_time: "2025-08-21 13:00:00",
      arrival_time: "2025-08-21 15:30:00",
      price: "1200000.00",
      available_seats: 140,
      classes: [
        {
          id: 1,
          name: "ekonomi",
          price: "1200000.00",
          available_seats: 80,
        },
        {
          id: 2,
          name: "bisnis",
          price: "2500000.00",
          available_seats: 40,
        },
        {
          id: 3,
          name: "first class",
          price: "5000000.00",
          available_seats: 20,
        },
      ],
    },
    {
      id: 3,
      airline: "Batik Air",
      flight_number: "ID789",
      origin: {
        id: 1,
        code: "CGK",
        name: "Soekarno-Hatta International Airport",
        city: "Jakarta",
        country: "Indonesia",
      },
      destination: {
        id: 2,
        code: "DPS",
        name: "Ngurah Rai International Airport",
        city: "Denpasar",
        country: "Indonesia",
      },
      departure_time: "2025-08-22 09:00:00",
      arrival_time: "2025-08-22 11:30:00",
      price: "1400000.00",
      available_seats: 160,
      classes: [
        {
          id: 1,
          name: "ekonomi",
          price: "1400000.00",
          available_seats: 90,
        },
        {
          id: 2,
          name: "bisnis",
          price: "2800000.00",
          available_seats: 50,
        },
        {
          id: 3,
          name: "first class",
          price: "5000000.00",
          available_seats: 20,
        },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newFlight, setNewFlight] = useState({
    airline: "",
    flight_number: "",
    origin: {
      id: "",
      code: "",
      name: "",
      city: "",
      country: "Indonesia",
    },
    destination: {
      id: "",
      code: "",
      name: "",
      city: "",
      country: "Indonesia",
    },
    departure_time: "",
    arrival_time: "",
    available_seats: "",
    classes: [
      {
        id: 1,
        name: "ekonomi",
        price: "",
        available_seats: "",
      },
      {
        id: 2,
        name: "bisnis",
        price: "",
        available_seats: "",
      },
      {
        id: 3,
        name: "first class",
        price: "",
        available_seats: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle airport selection
    if (name === "origin" || name === "destination") {
      const selectedAirport = airports.find(
        (airport) => airport.code === value
      );
      if (selectedAirport) {
        setNewFlight((prev) => ({
          ...prev,
          [name]: {
            id: selectedAirport.id,
            code: selectedAirport.code,
            name: selectedAirport.name,
            city: selectedAirport.city,
            country: selectedAirport.country,
          },
        }));
      }
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "classes") {
        const [_, index, field] = name.split(".");
        const updatedClasses = [...newFlight.classes];
        updatedClasses[index] = {
          ...updatedClasses[index],
          [field]: value,
        };
        setNewFlight({
          ...newFlight,
          classes: updatedClasses,
        });
      } else {
        setNewFlight({
          ...newFlight,
          [parent]: {
            ...newFlight[parent],
            [child]: value,
          },
        });
      }
    } else {
      setNewFlight({ ...newFlight, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/flights",
        newFlight,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.meta.code === 200) {
        await fetchFlights(); // Refresh the flights list
        setShowForm(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add new flight");
      console.error("Error adding flight:", err);
    }

    // Reset form
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

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Flights Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No. Penerbangan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Maskapai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rute
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waktu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kursi Tersedia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kelas & Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flights.map((flight) => (
              <tr key={flight.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {flight.flight_number}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{flight.airline}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-gray-900">
                      {flight.origin.city} ({flight.origin.code})
                    </p>
                    <p className="text-gray-500 text-xs">
                      {flight.origin.name}
                    </p>
                    <p className="text-gray-900 mt-1">
                      {flight.destination.city} ({flight.destination.code})
                    </p>
                    <p className="text-gray-500 text-xs">
                      {flight.destination.name}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-gray-900">
                      {new Date(flight.departure_time).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(flight.departure_time).toLocaleDateString(
                        "id-ID"
                      )}
                    </p>
                    <p className="text-gray-900 mt-1">
                      {new Date(flight.arrival_time).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(flight.arrival_time).toLocaleDateString(
                        "id-ID"
                      )}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {flight.available_seats} kursi
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm space-y-1">
                    {flight.classes.map((cls) => (
                      <div key={cls.id} className="flex justify-between">
                        <span className="text-gray-500 capitalize">
                          {cls.name}
                        </span>
                        <span className="text-gray-900">
                          Rp {parseInt(cls.price).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(flight.id)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(flight.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
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
          Menampilkan {flights.length} dari {flights.length} penerbangan
        </p>
      </div>

      {/* Modal Tambah Penerbangan */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[800px] my-8 max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Tambah Penerbangan Baru
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Isi detail penerbangan dengan lengkap
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maskapai
                  </label>
                  <input
                    name="airline"
                    value={newFlight.airline}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nama Maskapai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Penerbangan
                  </label>
                  <input
                    name="flight_number"
                    value={newFlight.flight_number}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 w-full focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Contoh: GA123"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Origin Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 text-blue-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      <h3 className="font-semibold">Bandara Asal</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Pilih Bandara Asal
                        </label>
                        <div className="relative">
                          <select
                            name="origin"
                            value={newFlight.origin.code}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Kota
                        </label>
                        <input
                          value={newFlight.origin.city}
                          className="border rounded-lg px-4 py-2 w-full bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Nama Bandara
                        </label>
                        <input
                          value={newFlight.origin.name}
                          onChange={handleChange}
                          className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Soekarno-Hatta International Airport"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Destination Section */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
                    <div className="flex items-center space-x-2 text-purple-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <h3 className="font-semibold">Bandara Tujuan</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Pilih Bandara Tujuan
                        </label>
                        <div className="relative">
                          <select
                            name="destination"
                            value={newFlight.destination.code}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Kota
                        </label>
                        <input
                          value={newFlight.destination.city}
                          className="border rounded-lg px-4 py-2 w-full bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Nama Bandara
                        </label>
                        <input
                          value={newFlight.destination.name}
                          onChange={handleChange}
                          className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Ngurah Rai International Airport"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waktu Keberangkatan
                  </label>
                  <input
                    type="datetime-local"
                    name="departure_time"
                    value={newFlight.departure_time}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Waktu Kedatangan
                  </label>
                  <input
                    type="datetime-local"
                    name="arrival_time"
                    value={newFlight.arrival_time}
                    onChange={handleChange}
                    className="border rounded-lg px-4 py-2 w-full"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center space-x-2 text-gray-700 mb-4">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <h3 className="font-semibold">Kelas Penerbangan & Harga</h3>
                  </div>

                  <div className="space-y-4">
                    {newFlight.classes.map((cls, index) => (
                      <div
                        key={cls.id}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center mb-3">
                          <span
                            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                              cls.name === "ekonomi"
                                ? "bg-green-400"
                                : cls.name === "bisnis"
                                ? "bg-blue-400"
                                : "bg-purple-400"
                            }`}
                          ></span>
                          <h4 className="font-medium text-gray-700 capitalize">
                            {cls.name}
                          </h4>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-600 block mb-1">
                              Harga
                            </label>
                            <div className="relative">
                              <span className="absolute left-3 top-2 text-gray-500">
                                Rp
                              </span>
                              <input
                                type="number"
                                name={`classes.${index}.price`}
                                value={cls.price}
                                onChange={handleChange}
                                className="border rounded-lg pl-12 pr-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="1000000"
                                min="0"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 block mb-1">
                              Jumlah Kursi
                            </label>
                            <input
                              type="number"
                              name={`classes.${index}.available_seats`}
                              value={cls.available_seats}
                              onChange={handleChange}
                              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="100"
                              min="1"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                >
                  Simpan Penerbangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flights;
