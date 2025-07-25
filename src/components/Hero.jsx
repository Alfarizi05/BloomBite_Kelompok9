import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productAPI } from "../services/productAPI";
import { bookingAPI } from "../services/bookingAPI";

export default function Hero() {
  const [randomProducts, setRandomProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    jumlah: 1,
  });
  const [isOrdering, setIsOrdering] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    productAPI
      .fetchProducts()
      .then((products) => {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePesan = async () => {
    const { nama, alamat, jumlah } = formData;
    const jumlahInt = parseInt(jumlah);

    if (!currentProduct || currentProduct.stok < jumlahInt || jumlahInt <= 0)
      return;
    if (!nama || !alamat) {
      setMessage("Isi semua data terlebih dahulu");
      return;
    }

    setIsOrdering(true);
    try {
      const updatedStok = currentProduct.stok - jumlahInt;

      await productAPI.updateProduct(currentProduct.id, {
        stok: updatedStok,
      });

      const bookingData = {
        nama_pemesan: nama,
        alamat,
        jumlah: jumlahInt,
        product_id: currentProduct.id,
      };

      await bookingAPI.createBooking(bookingData);

      setMessage("Pesanan berhasil!");
      setFormData({ nama: "", alamat: "", jumlah: 1 });
    } catch (err) {
      console.error("Gagal memesan produk:", err);
      setMessage("Gagal memesan produk.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative bg-black py-16 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/images/bg-pattern.png')] bg-cover opacity-5 pointer-events-none" />
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto">
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
            Untuk Produk{" "}
            <span className="text-yellow-400">{currentProduct.nama}</span>
          </h1>
          <p className="text-gray-300 text-sm mb-5 max-w-md">
            {currentProduct.deskripsi}
          </p>
          <div className="flex gap-4 mb-5">
            <button
              onClick={() => setShowModal(true)}
              className="bg-yellow-400 text-black px-5 py-2.5 rounded-lg shadow hover:bg-yellow-500 transition text-sm"
            >
              Booking Sekarang
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
              <img
                src="/img/tokopedia.png"
                alt="Tokopedia"
                className="w-4 h-4"
              />
              <span className="text-yellow-400 font-semibold text-sm">4.8</span>
              <span className="text-xs text-gray-300">Rating Tokopedia</span>
            </div>
          </div>
        </motion.div>

        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0 relative h-[380px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentProduct.gambar}
              src={currentProduct.gambar || "/img/logo.png"}
              alt={currentProduct.nama}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md rounded-xl shadow-xl object-cover absolute"
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

      {/* Modal Pemesanan */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <img
              src={currentProduct.gambar}
              alt={currentProduct.nama}
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentProduct.nama}
            </h2>
            <p className="text-sm text-gray-700 mb-2">
              {currentProduct.deskripsi}
            </p>
            <p className="text-lg font-bold text-yellow-500 mb-2">
              Harga: Rp {Number(currentProduct.harga).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Stok: {currentProduct.stok}
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
                max={currentProduct.stok}
                onChange={handleInputChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
            </div>

            <button
              onClick={handlePesan}
              disabled={
                currentProduct.stok === 0 ||
                isOrdering ||
                !formData.nama ||
                !formData.alamat ||
                formData.jumlah < 1
              }
              className={`w-full py-2 rounded font-semibold text-white ${
                currentProduct.stok === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-700"
              }`}
            >
              {currentProduct.stok === 0
                ? "Stok Habis"
                : isOrdering
                ? "Memesan..."
                : "Pesan"}
            </button>

            {message && (
              <p className="text-sm text-center mt-2 text-red-500">{message}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
