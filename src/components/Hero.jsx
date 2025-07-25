import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productAPI } from "../services/productAPI"; // Pastikan path ini benar

export default function Hero() {
  const [randomProducts, setRandomProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    productAPI
      .fetchProducts()
      .then((products) => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3); // Ambil 3 produk acak
        setRandomProducts(selected);
      })
      .catch((err) => console.error("Gagal memuat produk:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === randomProducts.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [randomProducts]);

  if (randomProducts.length === 0) {
    return <div className="p-6 text-white">Memuat produk...</div>;
  }

  const currentProduct = randomProducts[currentIndex];

  return (
    <section
      id="hero"
      className="relative bg-black py-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/bg-pattern.png')] bg-cover opacity-5 pointer-events-none" />
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto">

        {/* Kiri (konten teks) */}
        <motion.div
          key={currentIndex + "-text"}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <h2 className="text-yellow-400 text-sm font-semibold mb-2 uppercase tracking-wider">
            Promo Spesial
          </h2>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            Diskon Hingga 50% <br className="hidden md:block" />
            Untuk Produk <span className="text-yellow-400">{currentProduct.nama}</span>
          </h1>
          <p className="text-gray-300 text-sm mb-5 max-w-md">
            {currentProduct.deskripsi}
          </p>
          <div className="flex gap-4 mb-5">
            <button className="bg-yellow-400 text-black px-5 py-2.5 rounded-lg shadow hover:bg-yellow-500 transition text-sm">
              Lihat Katalog
            </button>
            <button className="bg-white text-black px-5 py-2.5 rounded-lg shadow hover:bg-gray-200 transition text-sm">
              Cek Promo
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img src="/img/google.png" alt="Google" className="w-4 h-4" />
              <span className="text-yellow-400 font-semibold text-sm">4.9</span>
              <span className="text-xs text-gray-300">Ulasan Google</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/img/tokopedia.png" alt="Tokopedia" className="w-4 h-4" />
              <span className="text-yellow-400 font-semibold text-sm">4.8</span>
              <span className="text-xs text-gray-300">Rating Tokopedia</span>
            </div>
          </div>
        </motion.div>

        {/* Kanan (Gambar produk) */}
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 relative h-[300px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentProduct.gambar}
              src={currentProduct.gambar || "/img/logo.png"}
              alt={currentProduct.nama}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-xs rounded-lg shadow-xl object-cover absolute"
            />
          </AnimatePresence>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {randomProducts.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? "bg-yellow-400" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
