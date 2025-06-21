import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  // Cek apakah ini halaman error
  const isErrorPage =
    location.pathname.startsWith("/error") || location.pathname === "*";
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        {/* Tampilkan Sidebar dan Header hanya jika bukan halaman error */}
        {!isErrorPage && <Sidebar />}
        <div id="main-content" className="flex-1 p-4">
          {!isErrorPage && <Header />}

          <Outlet />
        </div>
      </div>
    </div>
  );
}
