import { IoIosArrowBack } from "react-icons/io"; 
import { IoIosArrowForward } from "react-icons/io"; 
import { BiRightArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Produk() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  const PRODUCTS_PER_SLIDE = 8;

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=24")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => setError("Gagal mengambil data produk"));
  }, []);

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

  const startIndex = currentSlide * PRODUCTS_PER_SLIDE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_SLIDE);

  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <section id="produk" className="scroll-mt-20 p-8 bg-black text-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">
        Menu Produk Unggulan
      </h2>

      {/* Tombol Navigasi */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 text-yellow-400 border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition"
        >
          <IoIosArrowBack /> Sebelumnya
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 text-yellow-400 border border-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition"
        >
          Berikutnya <IoIosArrowForward />
        </button>
      </div>

      {/* Grid Produk */}
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
              onClick={() => setSelectedProduct(product)}
              className="bg-white text-black rounded-lg border-2 border-yellow-400 shadow-lg p-4 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-3 font-semibold text-lg">{product.title}</h3>
              <p className="text-yellow-500 font-bold mt-1">
                Rp {(product.price * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(products.length / PRODUCTS_PER_SLIDE) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition ${index === currentSlide ? "bg-yellow-400" : "bg-gray-500"
                }`}
            />
          )
        )}
      </div>

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ×
            </button>
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
            <p className="text-gray-600 mb-1">Kategori: {selectedProduct.category}</p>
            <p className="text-gray-600 mb-1">Brand: {selectedProduct.brand}</p>
            <p className="text-gray-800 mt-2 mb-3">{selectedProduct.description}</p>
            <p className="text-yellow-500 font-bold text-lg">
              Harga: Rp {(selectedProduct.price * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
