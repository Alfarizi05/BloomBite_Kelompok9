import React, { useEffect, useState } from "react";
import { testimoniAPI } from "../services/testimoniAPI";
import TestimoniInputForm from "./TestimoniInputForm";

const Testimoni = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadTestimonials = async () => {
    try {
      const data = await testimoniAPI.fetchAll();
      const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setTestimonials(sorted);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // Fungsi untuk mengambil inisial dari nama
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  return (
    <section id="testimoni" className="py-24 text-center text-white">
      <h2 className="text-4xl font-bold text-yellow-500 mb-12">Our Testimonials</h2>

      {/* Button Add */}
      <div className="flex justify-center mb-12">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition"
        >
          Tulis Testimoni
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-10 px-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-yellow-600 text-black w-64 rounded-xl shadow-md py-10 px-6 flex flex-col items-center"
          >
            {/* Lingkaran inisial */}
            <div className="w-24 h-24 rounded-full border-4 border-yellow-400 bg-white-950 flex items-center justify-center text-2xl font-bold text-black mb-2">
              {getInitials(t.nama)}
            </div>

            {/* Nama lengkap */}
            <h3 className="text-lg font-semibold mb-2">{t.nama}</h3>

            {/* Pesan dan rating */}
            <p className="text-sm text-gray-700 italic mb-2 text-center">“{t.pesan}”</p>
            <span className="text-yellow-500 font-semibold">⭐ {t.rating}/5</span>
          </div>
        ))}
      </div>

      {/* Form Pop-up */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
            onClick={() => setShowForm(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative border border-gray-100">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl transition-transform hover:scale-125"
                onClick={() => setShowForm(false)}
              >
                &times;
              </button>
              <TestimoniInputForm
                onSuccess={() => {
                  setShowForm(false);
                  loadTestimonials();
                }}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Testimoni;
