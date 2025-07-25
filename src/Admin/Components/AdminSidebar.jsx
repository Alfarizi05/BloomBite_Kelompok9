import {
  MdSpaceDashboard
} from "react-icons/md";
import {
  TbLayoutDashboard
} from "react-icons/tb";
import {
  FaBox,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaStore,
  FaUsers,
  FaStar,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa"; // Tambah ikon logout
import { Link, useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="fixed top-2 left-2 h-[98vh] w-70 bg-gradient-to-b from-gray-800 to-black text-white rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden z-50">
      <div>
        <div className="text-center py-6 text-2xl font-bold border-b border-gray-700">
          <img src="/img/logo.png" alt="Bloom&Bite" className="inline-block w-10 h-10 mr-2 align-middle" />
          Bloom&Bite
        </div>

        <div className="p-4">
          <nav className="space-y-2">
            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition">
              <MdSpaceDashboard />
              <span>Dashboard</span>
            </Link>

            <Link to="/dashboard/products" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition">
              <FaBox />
              <span>Produk</span>
            </Link>

            <Link to="/dashboard/aboutus" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition">
              <FaStore />
              <span>About Us</span>
            </Link>

            <Link to="/dashboard/ourteam" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition">
              <FaUsers />
              <span>Our Team</span>
            </Link>

            <Link to="/dashboard/testimoniform" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition">
              <FaStar />
              <span>Testimoni</span>
            </Link>

            <Link to="/dashboard/users" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition">
              <FaUser />
              <span>User</span>
            </Link>

            <Link to="/dashboard/booking" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition">
              <FaBox />
              <span>Booking</span>
            </Link>

            <div className="mt-6 mb-2 text-sm font-bold uppercase text-gray-400 px-4">
              Authentication
            </div>

            <Link to="/homepage" className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition">
              <FaHouse />
              <span>Home</span>
            </Link>
            {/* Logout button */}
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-400 text-center">© 2025 Bloom&Bite</div>
      </div>
    </div>
  );
}
