import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Plane, Users, Settings } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/admin" },
    { name: "Penerbangan", icon: <Plane size={18} />, path: "/admin/flights" },
    { name: "Pengguna", icon: <Users size={18} />, path: "/admin/users" },
    { name: "Pengaturan", icon: <Settings size={18} />, path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen shadow-lg">
      <div className="p-4 font-bold text-xl border-b border-blue-700">
        FlyTravell Admin
      </div>
      <nav className="mt-4">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 hover:bg-blue-700 transition ${
                isActive ? "bg-blue-700 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
