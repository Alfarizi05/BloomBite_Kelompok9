import React, { useEffect, useState } from "react";
import { testimoniAPI } from "../services/testimoniAPI";
import TestimoniInputForm from "./TestimoniInputForm";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 3;

const Testimoni = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

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

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const visibleTestimonials = testimonials.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  return (
    <section id="testimoni" className="bg-white py-24 text-black relative">
      <h2 className="text-4xl font-bold text-center mb-16">Testimonials</h2>

      {/* Button Add */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-400 transition"
        >
          Tulis Testimoni
        </button>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>

        <div className="flex gap-6">
          {visibleTestimonials.map((t) => (
            <div
              key={t.id}
              className="relative flex flex-col items-center text-center px-6 pt-16 pb-8 w-72 min-h-[300px] bg-white rounded-lg shadow-md"
            >
              <div className="absolute -top-12 w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={`https://avatar.iran.liara.run/username?username=${t.nama.replace(/\s/g, '')}`}
                  alt={t.nama}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 font-semibold text-lg">{t.nama}</p>
              <p className="mt-2 text-gray-600 text-sm">{t.pesan}</p>
              <p className="mt-2 text-blue-500 text-sm font-medium">Rating: {t.rating}/5</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Popup Form */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
            onClick={() => setShowForm(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
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
