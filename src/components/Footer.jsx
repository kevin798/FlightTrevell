import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Tentang Kami */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Tentang Kami</h3>
          <p>
            FlightTravel adalah platform pemesanan tiket pesawat yang mudah, cepat, dan aman. Kami
            berkomitmen untuk memberikan pengalaman perjalanan terbaik bagi pelanggan.
          </p>
        </div>

        {/* Layanan */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Layanan</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Pemesanan Tiket</a></li>
            <li><a href="#" className="hover:underline">Pusat Bantuan</a></li>
            <li><a href="#" className="hover:underline">Refund & Reschedule</a></li>
            <li><a href="#" className="hover:underline">Promo</a></li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Kontak</h3>
          <ul className="space-y-2">
            <li>Email: support@flighttravel.com</li>
            <li>Telepon: +62 812 3456 7890</li>
            <li>Alamat: Jakarta, Indonesia</li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Ikuti Kami</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-blue-400 pt-4 text-sm">
        &copy; {new Date().getFullYear()} <strong>FlightTravel</strong>. Semua hak dilindungi.
      </div>
    </footer>
  );
};

export default Footer;
