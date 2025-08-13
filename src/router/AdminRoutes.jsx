import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import Flights from "../pages/admin/Flights";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AdminRoutes;
