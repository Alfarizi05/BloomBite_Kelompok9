import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { productAPI } from "../services/productAPI";
import { bookingAPI } from "../services/bookingAPI";

export default function Navbar({ isScrolled }) {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    jumlah: 1,
  });

  const [isOrdering, setIsOrdering] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name || user.username || "User");
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  useEffect(() => {
    productAPI.fetchProducts()
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Gagal mengambil produk:", err));
  }, []);

  useEffect(() => {
    if (searchText.length >= 1) {
      const filtered = allProducts.filter((product) =>
        product.nama.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchText, allProducts]);

  const handleSelect = (id) => {
    const selected = allProducts.find((item) => item.id === id);
    if (selected) {
      setSelectedProduct(selected);
      setShowModal(true);
      setSearchText("");
      setSuggestions([]);
    }
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
    } catch (err) {
      console.error("Gagal memesan produk:", err);
      setMessage("Gagal memesan produk.");
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%]
        px-6 py-3 z-50 rounded-xl transition-all duration-300
        bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-between
        ${isScrolled ? "shadow-xl" : "shadow-md"}`}>

        <div className="flex items-center gap-2">
          <img src="/img/logo.png" alt="Logo Sedap" className="h-8 w-8" />
          <span className="text-xl font-bold text-yellow-400">Bloom&Bite</span>
        </div>

        <ul className="hidden md:flex gap-6 text-white items-center font-medium absolute left-1/2 transform -translate-x-1/2">
          <li><a href="#hero" className="hover:text-yellow-400">Beranda</a></li>
          <li><a href="#about" className="hover:text-yellow-400">Tentang</a></li>
          <li><a href="#produk" className="hover:text-yellow-400">Produk</a></li>
          <li><a href="#testimoni" className="hover:text-yellow-400">Testimoni</a></li>
          <li><a href="#cek-member" className="hover:text-yellow-400">Tim Kami</a></li>
        </ul>

        <div className="hidden md:flex items-center gap-4 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-3 py-2 rounded-md bg-gray-800 text-white border border-yellow-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm w-52"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full mt-1 left-0 w-full bg-white text-black rounded-md shadow-lg z-50 max-h-52 overflow-y-auto">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className="px-4 py-2 hover:bg-yellow-100 cursor-pointer text-sm border-b"
                  >
                    {item.nama}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-white bg-gray-800 px-3 py-2 rounded-lg">
                <FaUserCircle className="text-xl" />
                <span className="text-sm">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Login
            </a>
          )}
        </div>
      </nav>

      {showModal && selectedProduct && (
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
              src={selectedProduct.gambar}
              alt={selectedProduct.nama}
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedProduct.nama}
            </h2>
            <p className="text-sm text-gray-700 mb-2">{selectedProduct.deskripsi}</p>
            <p className="text-lg font-bold text-yellow-500 mb-2">
              Harga: Rp {Number(selectedProduct.harga).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">Stok: {selectedProduct.stok}</p>

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
                  : "bg-yellow-500 hover:bg-yellow-700"
              }`}
            >
              {selectedProduct.stok === 0
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
    </>
  );
}
