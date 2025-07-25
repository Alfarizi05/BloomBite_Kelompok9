import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { productAPI } from "../services/productAPI"; // sesuaikan path jika perlu

export default function Navbar({ isScrolled }) {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

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

  // Ambil produk dari backend
  useEffect(() => {
    productAPI.fetchProducts()
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Gagal mengambil produk:", err));
  }, []);

  // Filter berdasarkan pencarian
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

  return (
    <>
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%]
        px-6 py-3 z-50 rounded-xl transition-all duration-300
        bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-between
        ${isScrolled ? "shadow-xl" : "shadow-md"}`}>
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/img/logo.png" alt="Logo Sedap" className="h-8 w-8" />
          <span className="text-xl font-bold text-yellow-400">Bloom&Bite</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-6 text-white items-center font-medium absolute left-1/2 transform -translate-x-1/2">
          <li><a href="#hero" className="hover:text-yellow-400">Beranda</a></li>
          <li><a href="#about" className="hover:text-yellow-400">Tentang</a></li>
          <li><a href="#produk" className="hover:text-yellow-400">Produk</a></li>
          <li><a href="#testimoni" className="hover:text-yellow-400">Testimoni</a></li>
          <li><a href="#cek-member" className="hover:text-yellow-400">Tim Kami</a></li>
        </ul>

        {/* Search + Login */}
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

      {/* Modal Produk */}
      {showModal && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
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
            <p className="text-sm text-gray-700 mb-4">{selectedProduct.deskripsi}</p>
            <p className="text-lg font-bold text-yellow-500">
              Harga: Rp {Number(selectedProduct.harga).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
