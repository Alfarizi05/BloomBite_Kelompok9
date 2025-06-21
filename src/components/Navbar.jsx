import { useState, useEffect } from "react";

export default function Navbar({ isScrolled }) {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => setAllProducts(data.products))
      .catch((err) => console.error("Gagal mengambil produk:", err));
  }, []);

  // Filter suggestion
  useEffect(() => {
    if (searchText.length >= 1) {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchText, allProducts]);

  // Fetch detail for selected product
  const handleSelect = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedProduct(data);
        setShowModal(true);
        setSearchText("");
        setSuggestions([]);
      })
      .catch(() => alert("Gagal memuat detail produk"));
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%]
        px-6 py-3 z-50 rounded-xl transition-all duration-300
        bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-between
        ${isScrolled ? "shadow-xl" : "shadow-md"}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/img/logo.png" alt="Logo Sedap" className="h-8 w-8" />
          <span className="text-xl font-bold text-yellow-400">Bloom&Bite</span>
        </div>

        {/* Menu Tengah */}
        <ul className="hidden md:flex gap-6 text-white items-center font-medium absolute left-1/2 transform -translate-x-1/2">
          <li><a href="#hero" className="hover:text-yellow-400">Beranda</a></li>
          <li><a href="#about" className="hover:text-yellow-400">Tentang</a></li>
          <li><a href="#produk" className="hover:text-yellow-400">Produk</a></li>
          <li><a href="#testimoni" className="hover:text-yellow-400">Testimoni</a></li>
          <li><a href="#cek-member" className="hover:text-yellow-400">Tim Kami</a></li>
        </ul>

        {/* Search + Auth */}
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
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href="/login"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
          >
            Register
          </a>
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
      {/* Tombol X */}
      <button
        className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-red-500"
        onClick={() => setShowModal(false)}
      >
        ✕
      </button>

      {/* Gambar Produk */}
      <img
        src={selectedProduct.thumbnail}
        alt={selectedProduct.title}
        className="rounded-xl mb-4 w-full h-48 object-cover"
      />

      {/* Konten */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {selectedProduct.title}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Kategori:</span> {selectedProduct.category}
      </p>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-semibold">Brand:</span> {selectedProduct.brand}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        {selectedProduct.description}
      </p>
      <p className="text-lg font-bold text-yellow-500">
        Harga: Rp {Number(selectedProduct.price * 1000).toLocaleString()}
      </p>
    </div>
  </div>
)}
    </>
  );
}
