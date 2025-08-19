import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, Filter, Plane, Clock, Users, MapPin } from "lucide-react"
import axios from "axios"

const Flights = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [flights, setFlights] = useState([])
  const [airports, setAirports] = useState([])
  const [showForm, setShowForm] = useState(false)
  // State baru untuk melacak ID penerbangan yang sedang diedit
  const [editingId, setEditingId] = useState(null)
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
    classes: [
      { id: 1, name: "ekonomi", price: "", available_seats: "" },
      { id: 2, name: "bisnis", price: "", available_seats: "" },
      { id: 3, name: "first class", price: "", available_seats: "" },
    ],
  })

  const fetchFlights = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get("http://localhost:8000/api/public/flights")
      if (response.data.meta.code === 200) {
        setFlights(response.data.data)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch flights data")
      console.error("Error fetching flights:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAirports = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/public/airports")
      if (response.data.meta.code === 200) {
        setAirports(response.data.data)
      }
    } catch (err) {
      console.error("Error fetching airports:", err)
      setError(err.response?.data?.message || "Failed to fetch airports data")
    }
  }

  useEffect(() => {
    fetchFlights()
    fetchAirports()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus penerbangan ini?")) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/flights/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (response.data.meta.code === 200) {
          await fetchFlights()
        }
      } catch (err) {
        setError(err.response?.data?.message || "Gagal menghapus penerbangan")
        console.error("Error deleting flight:", err)
      }
    }
  }

  // Perbaikan: tambahkan setEditingId(id)
  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/flights/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.data.meta.code === 200) {
        setEditingId(id)
        setNewFlight(response.data.data)
        setShowForm(true)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data penerbangan")
      console.error("Error fetching flight details:", err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "origin" || name === "destination") {
      const selectedAirport = airports.find((airport) => airport.code === value)
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
        }))
      }
    } else if (name.includes(".")) {
      const [parent, index, field] = name.split(".")
      if (parent === "classes") {
        const updatedClasses = [...newFlight.classes]
        updatedClasses[index] = {
          ...updatedClasses[index],
          [field]: value,
        }
        setNewFlight({
          ...newFlight,
          classes: updatedClasses,
        })
      } else {
        setNewFlight({
          ...newFlight,
          [parent]: {
            ...newFlight[parent],
            [field]: value,
          },
        })
      }
    } else {
      setNewFlight({
        ...newFlight,
        [name]: value,
      })
    }
  }

  // Perbaikan: Tambahkan logika untuk POST dan PUT
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formattedData = {
        airline: newFlight.airline,
        flight_number: newFlight.flight_number,
        origin_airport_id: newFlight.origin.id,
        destination_airport_id: newFlight.destination.id,
        departure_time: newFlight.departure_time,
        arrival_time: newFlight.arrival_time,
        classes: newFlight.classes.map((cls) => ({
          id: cls.id,
          price: cls.price,
          available_seats: cls.available_seats,
        })),
      }

      if (editingId) {
        // Mode EDIT: Gunakan PUT untuk memperbarui
        await axios.put(`http://localhost:8000/api/flights/${editingId}`, formattedData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
      } else {
        // Mode TAMBAH: Gunakan POST untuk membuat data baru
        await axios.post("http://localhost:8000/api/flights", formattedData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
      }

      await fetchFlights()
      setShowForm(false)
      setError(null)
    } catch (err) {
      if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors
        const errorMessage = err.response.data.message
        setError(
          errorMessage ||
          Object.values(validationErrors || {})
            .flat()
            .join(", ") ||
          "Validation failed. Please check your input.",
        )
      } else {
        setError("Failed to add/update flight. Please try again later.")
      }
      console.error("Error adding/updating flight:", err)
    } finally {
      // Reset state form setelah selesai
      setNewFlight({
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
        classes: [
          { id: 1, name: "ekonomi", price: "", available_seats: "" },
          { id: 2, name: "bisnis", price: "", available_seats: "" },
          { id: 3, name: "first class", price: "", available_seats: "" },
        ],
      })
      setEditingId(null) // Reset editingId
    }
  }

  // Tampilan UI lainnya tetap sama...
  // ...
  // Modifikasi untuk tombol "Tambah" agar mereset editingId
  const handleOpenForm = () => {
    setEditingId(null);
    setNewFlight({
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
      classes: [
        { id: 1, name: "ekonomi", price: "", available_seats: "" },
        { id: 2, name: "bisnis", price: "", available_seats: "" },
        { id: 3, name: "first class", price: "", available_seats: "" },
      ],
    })
    setShowForm(true);
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 h-full">
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="p-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Manajemen Penerbangan
                </h1>
                <p className="text-sm text-gray-600">Kelola semua penerbangan dengan mudah</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-3 rounded-lg border border-green-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-700">{flights.length} Penerbangan Aktif</span>
                </div>
              </div>

              <button
                onClick={handleOpenForm}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Tambah</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-md border border-white/20 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-800">Filter & Pencarian</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nomor penerbangan..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
              />
            </div>

            <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200">
              <option value="">🛫 Semua Maskapai</option>
              <option value="garuda">🦅 Garuda Indonesia</option>
              <option value="lion">🦁 Lion Air</option>
              <option value="citilink">🔗 Citilink</option>
            </select>

            <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200">
              <option value="">📊 Semua Status</option>
              <option value="active">✅ Aktif</option>
              <option value="full">🔴 Penuh</option>
              <option value="cancelled">❌ Dibatalkan</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-white/20 p-8">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-200"></div>
                <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-600 border-t-transparent absolute top-0"></div>
              </div>
              <p className="mt-3 text-sm text-gray-600 font-medium">Memuat data penerbangan...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-3 mb-4 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm font-bold">!</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-red-800">Terjadi Kesalahan</h4>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  {[
                    { label: "No. Penerbangan", icon: "✈️" },
                    { label: "Maskapai", icon: "🏢" },
                    { label: "Rute", icon: "🗺️" },
                    { label: "Waktu", icon: "⏰" },
                    { label: "Kursi", icon: "💺" },
                    { label: "Kelas & Harga", icon: "💰" },
                    { label: "Aksi", icon: "⚙️" },
                  ].map((head, i) => (
                    <th key={i} className="px-4 py-3 text-left text-xs font-bold text-gray-700 tracking-wide">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{head.icon}</span>
                        <span className="text-xs">{head.label}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {flights.map((flight, idx) => (
                  <tr
                    key={flight.id}
                    className={`hover:bg-blue-50/50 transition-all duration-200 ${
                      idx % 2 === 0 ? "bg-white/50" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                          <Plane className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{flight.flight_number}</p>
                          <p className="text-xs text-gray-500">Flight Number</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{flight.airline.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{flight.airline}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-green-600" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {flight.origin.city} ({flight.origin.code})
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-[150px]">{flight.origin.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="w-6 border-t border-dashed border-gray-300"></div>
                          <Plane className="w-3 h-3 text-blue-500 mx-1" />
                          <div className="w-6 border-t border-dashed border-gray-300"></div>
                        </div>

                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-600" />
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {flight.destination.city} ({flight.destination.code})
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-[150px]">{flight.destination.name}</p>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="space-y-2">
                        <div className="bg-green-50 p-2 rounded-md border border-green-200">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-green-600" />
                            <span className="text-xs font-medium text-green-800">Berangkat</span>
                          </div>
                          <p className="text-sm font-bold text-green-900">
                            {new Date(flight.departure_time).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="text-xs text-green-600">
                            {new Date(flight.departure_time).toLocaleDateString("id-ID")}
                          </p>
                        </div>

                        <div className="bg-blue-50 p-2 rounded-md border border-blue-200">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-600" />
                            <span className="text-xs font-medium text-blue-800">Tiba</span>
                          </div>
                          <p className="text-sm font-bold text-blue-900">
                            {new Date(flight.arrival_time).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="text-xs text-blue-600">
                            {new Date(flight.arrival_time).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-indigo-600" />
                        <div>
                          <p className="text-lg font-bold text-indigo-900">{flight.available_seats}</p>
                          <p className="text-xs text-gray-600">kursi</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        {flight.classes.map((cls) => (
                          <div
                            key={cls.id}
                            className={`p-2 rounded-md border ${
                              cls.name === "ekonomi"
                                ? "bg-green-50 border-green-200"
                                : cls.name === "bisnis"
                                  ? "bg-blue-50 border-blue-200"
                                  : "bg-purple-50 border-purple-200"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span
                                className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                                  cls.name === "ekonomi"
                                    ? "bg-green-100 text-green-800"
                                    : cls.name === "bisnis"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {cls.name.toUpperCase()}
                              </span>
                              <span className="text-xs font-bold text-gray-900">
                                Rp {Number.parseInt(cls.price).toLocaleString("id-ID")}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(flight.id)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-all duration-200 transform hover:scale-110"
                          title="Edit Penerbangan"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(flight.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-all duration-200 transform hover:scale-110"
                          title="Hapus Penerbangan"
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
        </div>

        <div className="flex justify-between items-center mt-4 bg-white/50 backdrop-blur-sm p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-700">
              Menampilkan <span className="font-bold text-blue-600">{flights.length}</span> penerbangan aktif
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>Terakhir diperbarui: {new Date().toLocaleTimeString("id-ID")}</span>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center overflow-y-auto z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{editingId ? "Edit Penerbangan" : "Tambah Penerbangan Baru"}</h2>
                    <p className="text-blue-100">Lengkapi informasi penerbangan di bawah ini</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null); 
                  }}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-xl">×</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-blue-600" />
                  Informasi Dasar Penerbangan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maskapai</label>
                    <input
                      type="text"
                      name="airline"
                      value={newFlight.airline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: Garuda Indonesia"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Penerbangan</label>
                    <input
                      type="text"
                      name="flight_number"
                      value={newFlight.flight_number}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Contoh: GA123"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Informasi Rute
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bandara Asal</label>
                    <select
                      name="origin"
                      value={newFlight.origin.code}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Pilih Bandara Asal</option>
                      {airports.map((airport) => (
                        <option key={airport.id} value={airport.code}>
                          {airport.city} ({airport.code}) - {airport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bandara Tujuan</label>
                    <select
                      name="destination"
                      value={newFlight.destination.code}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Pilih Bandara Tujuan</option>
                      {airports.map((airport) => (
                        <option key={airport.id} value={airport.code}>
                          {airport.city} ({airport.code}) - {airport.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Information */}
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Jadwal Penerbangan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Keberangkatan</label>
                    <input
                      type="datetime-local"
                      name="departure_time"
                      value={newFlight.departure_time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Kedatangan</label>
                    <input
                      type="datetime-local"
                      name="arrival_time"
                      value={newFlight.arrival_time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
              </div>


              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Informasi Kelas & Harga
                </h3>
                <div className="space-y-4">
                  {newFlight.classes.map((cls, index) => (
                    <div key={cls.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-3 capitalize">Kelas {cls.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                          <input
                            type="number"
                            name={`classes.${index}.price`}
                            value={cls.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="0"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Kursi Tersedia</label>
                          <input
                            type="number"
                            name={`classes.${index}.available_seats`}
                            value={cls.available_seats}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="0"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {editingId ? "Perbarui Penerbangan" : "Simpan Penerbangan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Flights