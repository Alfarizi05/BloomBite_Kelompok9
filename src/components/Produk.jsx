import React, { useEffect, useState } from "react";
import { productAPI } from "../services/productAPI";
import { bookingAPI } from "../services/bookingAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBox from "../components/AlertBox";
import { AnimatePresence, motion } from "framer-motion";

const Produk = () => {
  const [products, setProducts] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    jumlah: 1,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await productAPI.fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setMessage("Gagal mengambil data produk.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalSlides = Math.ceil(products.length / 5);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePesan = async () => {
    const { nama, alamat, jumlah } = formData;
    const jumlahInt = parseInt(jumlah);

    if (!selectedProduct || selectedProduct.stok < jumlahInt || jumlahInt <= 0) return;
    if (!nama || !alamat) {
      setMessage("Isi semua data terlebih dahulu");
      return;
    }

    setIsOrdering(true);
    try {
      const updatedStok = selectedProduct.stok - jumlahInt;

      await productAPI.updateProduct(selectedProduct.id, {
        stok: updatedStok,
      });

      const bookingData = {
        nama_pemesan: nama,
        alamat,
        jumlah: jumlahInt,
        product_id: selectedProduct.id,
      };

      await bookingAPI.createBooking(bookingData);

      setMessage("Pesanan berhasil!");
      setSelectedProduct(null);
      setFormData({ nama: "", alamat: "", jumlah: 1 });
      fetchData();
    } catch (err) {
      console.error("Gagal memesan produk:", err);
      setMessage("Gagal memesan produk.");
    } finally {
      setIsOrdering(false);
    }
  };

  const handleNext = () => {
    setSlideDirection("next");
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setSlideDirection("prev");
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const displayedProducts = products.slice(slideIndex * 5, slideIndex * 5 + 5);

  const slideVariants = {
    enter: (direction) => ({
      x: direction === "next" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction === "next" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Daftar Produk</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">Belum ada produk.</p>
      ) : (
        <div>
          <div className="flex justify-between mb-4">
            <button
              onClick={handlePrev}
              className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
            >
              Next
            </button>
          </div>

          <div className="relative h-auto min-h-[300px]">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={slideIndex}
                variants={slideVariants}
                custom={slideDirection}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 absolute w-full"
              >
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-md rounded-xl overflow-hidden"
                  >
                    <img
                      src={product.gambar || "/img/logo.png"}
                      alt={product.nama}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-bold">{product.nama}</h2>
                      <p className="text-gray-700 mb-2 text-sm">{product.deskripsi}</p>
                      <p className="text-yellow-500 font-bold mb-1 text-sm">
                        Rp {product.harga?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">Stok: {product.stok}</p>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded text-sm"
                        disabled={product.stok === 0}
                      >
                        {product.stok === 0 ? "Stok Habis" : "Pesan"}
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Modal Pemesanan */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-black rounded-xl p-6 max-w-md w-full shadow-xl relative"
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ×
            </button>
            <img
              src={selectedProduct.gambar || "/img/logo.png"}
              alt={selectedProduct.nama}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.nama}</h2>
            <p className="text-gray-800 mt-2 mb-3">{selectedProduct.deskripsi}</p>
            <p className="text-yellow-500 font-bold text-lg">
              Harga: Rp {selectedProduct.harga?.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-3">
              Stok tersedia: {selectedProduct.stok}
            </p>

            <div className="space-y-2 mb-4">
              <input
                type="text"
                name="nama"
                placeholder="Nama Pemesan"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="text"
                name="alamat"
                placeholder="Alamat Pemesan"
                value={formData.alamat}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="number"
                name="jumlah"
                placeholder="Jumlah"
                value={formData.jumlah}
                min={1}
                max={selectedProduct.stok}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <button
              onClick={handlePesan}
              disabled={
                selectedProduct.stok === 0 ||
                isOrdering ||
                !formData.nama ||
                !formData.alamat ||
                formData.jumlah < 1
              }
              className={`w-full py-2 rounded font-semibold text-white ${
                selectedProduct.stok === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {selectedProduct.stok === 0
                ? "Stok Habis"
                : isOrdering
                ? "Memesan..."
                : "Pesan"}
            </button>
          </motion.div>
        </div>
      )}

      {message && <AlertBox type="info" message={message} />}
    </div>
  );
};

export default Produk;