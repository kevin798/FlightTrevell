import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/user/HomePage";
import BookingPage from "../pages/user/BookingPage";
import SearchResults from "../pages/user/HasilPencarian";
import PilihKursi from "../pages/user/PilihKursi";
import Pembayaran from "../pages/user/Pembayaran";
import HotelBookingPage from "../pages/user/HotelBookingPage";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/pesawat" element={<BookingPage />} />
    <Route path="/hasil-pencarian" element={<SearchResults />} />
    <Route path="/pilih-kursi" element={<PilihKursi />} />
    <Route path="/pembayaran" element={<Pembayaran />} />
    <Route path="/hotel" element={<HotelBookingPage />} />
  </Routes>
);

export default UserRoutes;
