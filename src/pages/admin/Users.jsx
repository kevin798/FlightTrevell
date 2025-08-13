import React from "react";
import {
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Trash2,
  Shield,
} from "lucide-react";

const Users = () => {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+62 812-3456-7890",
      address: "Jakarta, Indonesia",
      role: "User",
      status: "Active",
      joinDate: "2025-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+62 813-9876-5432",
      address: "Surabaya, Indonesia",
      role: "Admin",
      status: "Active",
      joinDate: "2025-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+62 821-2345-6789",
      address: "Bandung, Indonesia",
      role: "User",
      status: "Inactive",
      joinDate: "2025-03-10",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Pengguna</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <UserPlus className="w-5 h-5 mr-2" />
          Tambah Pengguna
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Cari pengguna..."
            className="border rounded-lg px-4 py-2"
          />
          <select className="border rounded-lg px-4 py-2">
            <option value="">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <select className="border rounded-lg px-4 py-2">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === "Admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {user.role}
                </span>
              </div>
              <div className="flex gap-2">
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
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{user.address}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
                <span className="text-sm text-gray-500">
                  Bergabung: {user.joinDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Menampilkan 1 - 3 dari 25 pengguna
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

export default Users;
