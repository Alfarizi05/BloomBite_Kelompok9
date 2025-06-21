import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Produk() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);

  const PRODUCTS_PER_SLIDE = 8;

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=24")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => setError("Gagal mengambil data produk"));
  }, []);

  // Auto-slide (opsional)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === Math.floor(products.length / PRODUCTS_PER_SLIDE) - 1 ? 0 : prev + 1
      );
    }, 7000); // Setiap 7 detik
    return () => clearInterval(interval);
  }, [products]);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.floor(products.length / PRODUCTS_PER_SLIDE) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === Math.floor(products.length / PRODUCTS_PER_SLIDE) - 1 ? 0 : prev + 1
    );
  };

  if (error) return <div className="text-red-600 p-4">{error}</div>;

  const startIndex = currentSlide * PRODUCTS_PER_SLIDE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_SLIDE);

  return (
    <section id="produk" className="scroll-mt-20 p-8 bg-black text-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">
        Menu Produk Unggulan
      </h2>

      {/* Tombol Navigasi */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrev}
          className="text-yellow-400 border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition"
        >
          ◀ Sebelumnya
        </button>
        <button
          onClick={handleNext}
          className="text-yellow-400 border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition"
        >
          Berikutnya ▶
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white text-black rounded-lg border-2 border-yellow-400 shadow-lg p-4 text-center hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/produk/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-3 font-semibold text-lg">{product.title}</h3>
                <p className="text-yellow-500 font-bold mt-1">
                  Rp {(product.price * 1000).toLocaleString()}
                </p>
              </Link>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Indicator Slide */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(products.length / PRODUCTS_PER_SLIDE) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition ${
                index === currentSlide ? "bg-yellow-400" : "bg-gray-500"
              }`}
            />
          )
        )}
      </div>
    </section>
  );
}
