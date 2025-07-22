import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side (Image + Info) */}
      <div className="w-1/2 bg-cover bg-center text-white flex flex-col justify-between p-12" style={{ backgroundImage: "url('/public/img/background.jpg')" }}>
        <div></div> {/* Spacer */}
        <div>
          <h1 className="text-yellow-300 text-5xl font-bold mb-2">Bloom&Bite</h1>
          <p className="text-lg tracking-wide mb-8">gatau males pen beli truk</p>
        </div>
        <div>
          <p className="text-sm font-semibold">calm & relaxed</p>
          <p className="text-sm">Contact: +62 871 7323 8801</p>
          <p className="text-sm">www.natureku.co</p>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="w-1/2 flex items-center justify-center bg-white rounded-l-3xl">
        <div className="w-full max-w-md px-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
