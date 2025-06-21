export default function Navbar({ isScrolled }) {
  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%]
      px-6 py-3 z-50 rounded-xl transition-all duration-300
      bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-between
      ${isScrolled ? "shadow-xl" : "shadow-md"}`}
    >
      {/* Logo (Kiri) */}
      <div className="flex items-center gap-2">
        <img src="/img/logo.png" alt="Logo Sedap" className="h-8 w-8" />
        <span className="text-xl font-bold text-yellow-400">Bloom&Bite</span>
      </div>

      {/* Menu Tengah */}
      <ul className="hidden md:flex gap-6 text-white items-center font-medium absolute left-1/2 transform -translate-x-1/2">
        <li><a href="#hero" className="hover:text-yellow-400">Beranda</a></li>
        <li><a href="#about" className="hover:text-yellow-400">Tentang</a></li>
        <li><a href="#produk" className="hover:text-yellow-400">Menu</a></li>
        <li><a href="#testimoni" className="hover:text-yellow-400">Testimoni</a></li>
        <li><a href="#cek-member" className="hover:text-yellow-400">Cek Member</a></li>
      </ul>

      {/* Login & Register (Kanan) */}
      <div className="hidden md:flex gap-4">
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
  );
}
