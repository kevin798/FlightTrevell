import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Plane,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={18} />,
      path: "/admin",
      description: "Ikhtisar data dan statistik",
    },
    {
      name: "Penerbangan",
      icon: <Plane size={18} />,
      path: "/admin/flights",
      description: "Kelola jadwal penerbangan",
    },
    {
      name: "Pengguna",
      icon: <Users size={18} />,
      path: "/admin/users",
      description: "Manajemen pengguna",
    },
    {
      name: "Pengaturan",
      icon: <Settings size={18} />,
      path: "/admin/settings",
      description: "Konfigurasi sistem",
    },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
    navigate("/");
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-blue-900 to-blue-800 text-white min-h-screen shadow-xl transition-all duration-300 relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-blue-600 p-1 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isCollapsed ? <Menu size={16} /> : <X size={16} />}
      </button>

      {/* Header */}
      <div className="p-4 border-b border-blue-700/50 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <span className="text-blue-900 font-bold text-xl">F</span>
        </div>
        {!isCollapsed && <span className="font-bold text-xl">FlyTravell</span>}
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                isActive
                  ? "bg-blue-700 text-white font-semibold shadow-lg"
                  : "text-blue-100 hover:bg-blue-800"
              }`
            }
            title={isCollapsed ? item.name : ""}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            {!isCollapsed && (
              <div>
                <div>{item.name}</div>
                <div className="text-xs text-blue-300">{item.description}</div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div
          className={`flex items-center gap-3 cursor-pointer hover:bg-blue-800 p-2 rounded-lg transition-colors ${
            showDropdown ? "bg-blue-800" : ""
          }`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="font-semibold">A</span>
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-grow">
                <div className="text-sm font-semibold">Admin User</div>
                <div className="text-xs text-blue-300">
                  admin@flytravell.com
                </div>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </div>

        {/* Dropdown Menu */}
        {showDropdown && !isCollapsed && (
          <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-blue-800 rounded-lg shadow-xl">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-blue-100 hover:bg-blue-700 rounded transition-colors"
            >
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
