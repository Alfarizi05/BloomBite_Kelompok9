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
  const [formData, setFormData] = useState({ nama: "", alamat: "", jumlah: 1 });

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const totalSlides = Math.max(1, Math.ceil(products.length / 3));

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection("next");
      setSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleNext = () => {
    setSlideDirection("next");
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setSlideDirection("prev");
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

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
      await productAPI.updateProduct(selectedProduct.id, { stok: updatedStok });
      await bookingAPI.createBooking({
        nama_pemesan: nama,
        alamat,
        jumlah: jumlahInt,
        product_id: selectedProduct.id,
      });

      setMessage("Pesanan berhasil!");
      setSelectedProduct(null);
      setFormData({ nama: "", alamat: "", jumlah: 1 });
      const refreshedProducts = await productAPI.fetchProducts();
      setProducts(refreshedProducts);
    } catch (err) {
      console.error("Gagal memesan produk:", err);
      setMessage("Gagal memesan produk.");
    } finally {
      setIsOrdering(false);
    }
  };

  const displayedProducts = products.slice(slideIndex * 3, slideIndex * 3 + 3);

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-yellow-500">
        Produk Kami
      </h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">Tidak ada produk tersedia.</p>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <button
              onClick={handlePrev}
              className="bg-yellow-200 hover:bg-yellow-300 text-sm font-semibold px-4 py-2 rounded-lg"
            >
              ‹ Sebelumnya
            </button>
            <button
              onClick={handleNext}
              className="bg-yellow-200 hover:bg-yellow-300 text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Selanjutnya ›
            </button>
          </div>

          <div className="relative min-h-[420px]">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={slideIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 absolute w-full"
              >
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border-2 border-yellow-400 shadow-lg rounded-xl overflow-hidden transition duration-300"
                  >
                    <img
                      src={product.gambar || "/img/logo.png"}
                      alt={product.nama || "Produk"}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4 space-y-1">
                      <h2 className="text-xl font-bold text-gray-800">{product.nama}</h2>
                      <p className="text-gray-500 text-sm line-clamp-2">{product.deskripsi}</p>
                      <p className="text-yellow-600 font-semibold text-lg">
                        Rp {product.harga?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">Stok: {product.stok}</p>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full mt-2 py-2 rounded bg-yellow-500 hover:bg-yellow-700 text-white text-sm"
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
        </>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
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
            <h2 className="text-xl font-bold mb-2">{selectedProduct.nama}</h2>
            <p className="text-gray-700 mb-2 text-sm">{selectedProduct.deskripsi}</p>
            <p className="text-yellow-500 font-bold">
              Rp {selectedProduct.harga?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-3">Stok: {selectedProduct.stok}</p>

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
                  : "bg-yellow-600 hover:bg-yellow-700"
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