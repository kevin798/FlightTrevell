import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import AuthForm from "../pages/auth/AuthForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />

        {/* Admin Routes with Sidebar */}
        <Route
          path="/admin/*"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                <AdminRoutes />
              </div>
            </div>
          }
        />

        {/* User Routes with Navbar and Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="min-h-screen">
                <UserRoutes />
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
