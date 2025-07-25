import React, { useEffect, useState } from "react";
import { aboutUsAPI } from "../services/aboutUsAPI";
import { BsFlower1 } from "react-icons/bs";
import { GiFruitBowl } from "react-icons/gi";
import { LuSofa } from "react-icons/lu";

export default function AboutPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await aboutUsAPI.fetchAll();
        setData(res); // atau gunakan res.slice(0, 3) untuk batasi 3 item
      } catch (err) {
        console.error("Gagal memuat data About Us:", err);
      }
    };
    loadData();
  }, []);

  if (!data.length) return null;

  return (
    <section id="aboutpage" className="scroll-mt-20 py-24 px-6 text-center bg-black bg-cover bg-no-repeat bg-center text-yellow-100">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
          Tentang Bloom & Bite
        </h1>
        <p className="max-w-3xl mx-auto leading-relaxed">
          Bloom & Bite adalah brand gaya hidup modern yang memadukan tiga pilar utama: 
          <span className="text-yellow-300 font-semibold"> Bloom </span> untuk kecantikan dan perawatan diri, 
          <span className="text-yellow-300 font-semibold"> Bite </span> untuk pangan sehat dan lezat, serta 
          <span className="text-yellow-300 font-semibold"> Furniture </span> yang estetis dan fungsional.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.map((item, index) => {
          const Icon =
            index === 0 ? BsFlower1 :
            index === 1 ? GiFruitBowl : LuSofa;

          return (
            <div
              key={item.id}
              className="border border-yellow-500 rounded-xl p-6 bg-yellow-900/10 hover:bg-yellow-700/10 transition"
            >
              <Icon className="text-5xl mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-bold mb-2 text-yellow-200">
                {item.title}
              </h3>
              <p className="text-yellow-100">{item.deskripsi}</p>
              {item.gambar && (
                <img
                  src={item.gambar}
                  alt={item.title}
                  className="mt-4 rounded-lg w-full h-48 object-cover shadow-md"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
