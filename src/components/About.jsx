import { useEffect, useState } from "react";
import { aboutUsAPI } from "../services/aboutUsAPI";

export default function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await aboutUsAPI.fetchAll();
        // Ambil item pertama (atau sesuaikan sesuai kebutuhan)
        setData(res[0]);
      } catch (error) {
        console.error("Gagal memuat data About Us:", error);
      }
    };
    fetchAbout();
  }, []);

  if (!data) return null;

  return (
    <section id="about" className="scroll-mt-20 px-6 py-12 bg-yellow text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Gambar/logo dari data API */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src={data.gambar || "/img/logo.png"}
            alt={data.title || "Bloom & Bite"}
            className="h-32 w-32 object-contain"
          />
        </div>

        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-bold text-black-400 mb-4">
            {data.title || "Tentang Bloom & Bite"}
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
            {data.deskripsi || "Bloom & Bite adalah brand gaya hidup modern..."}
          </p>
        </div>
      </div>
    </section>
  );
}
