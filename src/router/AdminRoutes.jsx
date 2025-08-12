import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { Dashboard } from "../pages/admin/Dashboard";
import Flights from "../pages/admin/Flights";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/flights" element={<Flights />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
