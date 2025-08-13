import React from "react";
import {
  Save,
  Bell,
  Lock,
  Globe,
  CreditCard,
  User,
  Palette,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Pengaturan</h1>
        <p className="text-gray-600 mt-2">
          Kelola pengaturan aplikasi dan sistem
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Profil Admin
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2"
                    defaultValue="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-4 py-2"
                  defaultValue="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-4 py-2"
                  defaultValue="+62 812-3456-7890"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-blue-600" />
              Keamanan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password Lama
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password Baru
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-blue-600" />
              Notifikasi
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Email Notifikasi</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">SMS Notifikasi</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-600" />
              Sistem
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bahasa
                </label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zona Waktu
                </label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option value="asia/jakarta">Asia/Jakarta (GMT+7)</option>
                  <option value="asia/makassar">Asia/Makassar (GMT+8)</option>
                  <option value="asia/jayapura">Asia/Jayapura (GMT+9)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-blue-600" />
              Tampilan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tema
                </label>
                <select className="w-full border rounded-lg px-4 py-2">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
          <Save className="w-5 h-5 mr-2" />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default Settings;
