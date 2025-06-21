import React from "react";

const ErrorPage = ({ code, description, image }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 px-4 transition-all duration-500">
      <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-2xl text-center space-y-6 transform transition duration-500 hover:scale-[1.02]">
        
        {/* Gambar error */}
        <img
          src={image}
          alt={`Error ${code}`}
          className="w-40 h-40 mx-auto mb-6 object-cover rounded-full border-4 border-gray-300 transition-all duration-500 hover:rotate-3"
        />

        {/* Kode error berkedip */}
        <div className="relative inline-block">
          <span className="absolute inset-0 animate-ping text-red-400 text-7xl font-extrabold opacity-75">{code}</span>
          <h1 className="relative text-7xl font-extrabold text-red-500">{code}</h1>
        </div>

        {/* Pesan error berdenyut */}
        <h2 className="text-3xl font-semibold text-gray-800 animate-pulse">{description}</h2>

        {/* Tombol navigasi */}
        <a
          href="/"
          className="mt-6 px-8 py-3 bg-green-600 text-white text-lg rounded-full transition-transform duration-300 hover:bg-green-700 hover:scale-105 active:scale-95"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
