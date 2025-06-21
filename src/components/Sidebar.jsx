import { BsBorderStyle } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiNote } from "react-icons/bi";

export default function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col mb-10">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900"
        >
          Sedap{" "}
          <b id="logo-dot" className="text-hijau">
            .
          </b>
        </span>
        <span id="logo-subtitle" className="font-semibold text-gray-400">
          Modern Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <ul className="space-y-4">
        <li>
          {/* Dashboard */}
          <Link
            id="menu-1"
            to="/"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <MdSpaceDashboard className="mr-4 text-xl" />
            Dashboard
          </Link>

          {/* Orders */}
          <Link
            id="menu-2"
            to="/orders"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <BsBorderStyle className="mr-4 text-xl" />
            Orders
          </Link>

          {/* Customers */}
          <Link
            id="menu-3"
            to="/customers"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <AiOutlineShoppingCart className="mr-4 text-xl" />
            Customer
          </Link>

          {/* User Menu */}
          <Link
            id="menu-user"
            to="/users"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <AiOutlineShoppingCart className="mr-4 text-xl" />
            User
          </Link>

          {/* Error Pages */}
          <Link
            id="menu-4"
            to="/error/400"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <BsBorderStyle className="mr-4 text-xl" />
            Error 400
          </Link>
          <Link
            id="menu-5"
            to="/error/401"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <BsBorderStyle className="mr-4 text-xl" />
            Error 401
          </Link>
          <Link
            id="menu-6"
            to="/error/403"
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold"
          >
            <BsBorderStyle className="mr-4 text-xl" />
            Error 403
          </Link>
          <Link 
            id="menu-7"
            to="/products" 
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
            <AiOutlineShoppingCart className="mr-4 text-xl" />
            Products
          </Link>
          <Link 
            id="menu-8"
            to="/notes" 
            className="hover:text-hijau flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:font-extrabold">
            <BiNote className="mr-4 text-xl" />
            notes
          </Link>
        </li>
        <li></li>
      </ul>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center"
        >
          <div id="footer-text" className="text-white text-sm">
            <span>Please organize your menus through button below!</span>
            <div
              id="add-menu-button"
              className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2"
            >
              <span className="text-gray-600 flex items-center">
                <AiOutlinePlus /> Add Menus
              </span>
            </div>
          </div>
          <img
            id="footer-avatar"
            src="https://avatar.iran.liara.run/public/28"
            className="w-20 rounded-full"
          />
        </div>
        <span id="footer-brand" className="font-bold text-gray-400">
          Sedap Restaurant Admin Dashboard
        </span>
        <p id="footer-copyright" className="font-light text-gray-400">
          &copy; 2025 All Right Reserved
        </p>
      </div>
    </div>
  );
}
