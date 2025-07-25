import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Produk from "../components/Produk";
import Testimoni from "../components/Testimoni";
import CekMember from "../components/CekMember";
import Footer from "../components/Footer";


export default function SedapGuestPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setRole(parsedUser.role);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="font-sans antialiased min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/img/black.jpg')" }}
    >
      <div className="bg-white-400 bg-opacity-80 min-h-screen">
        <Navbar isScrolled={isScrolled} />
        <main className="pt-28">
          <Hero />
          <About />
          <Produk />
          <Testimoni />
          <CekMember />
        </main>

        {/* TOMBOL DASHBOARD JIKA ADMIN */}
        {role === "admin" && (
          <div className="text-center my-6">
            <a
              href="/dashboard"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Masuk ke Dashboard Admin
            </a>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
