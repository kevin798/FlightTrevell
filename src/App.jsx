import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import SearchResults from "./pages/HasilPencarian";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PilihKursi from "./pages/PilihKursi";
import Pembayaran from "./pages/Pembayaran";
import HotelBookingPage from "./pages/HotelBookingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <div className="min-h-screen">
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/pesawat" element={<BookingPage />} />
                  <Route path="/hasil-pencarian" element={<SearchResults />} />
                  <Route path="/pilih-kursi" element={<PilihKursi />} />
                  <Route path="/pembayaran" element={<Pembayaran />} />
                  <Route path="/hotel" element={<HotelBookingPage />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
