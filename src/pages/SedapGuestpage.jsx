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

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="font-sans antialiased min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/img/black.jpg')" }}
    >
      {/* Overlay agar konten tetap terbaca */}
      <div className="bg-white-400 bg-opacity-80 min-h-screen" style={{ backgroundImage: "url('/img/black.jpg')" }}>
        <Navbar isScrolled={isScrolled} />
        <main className="pt-20">
          <Hero />
          <About />
          <Produk />
          <Testimoni />
          <CekMember />
        </main>
        <Footer />
      </div>
    </div>
  );
}
