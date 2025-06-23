import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const member = [
  {
    nama: "Alfarizi Algamar",
    jurusan: "Teknik Informatika",
    deskripsi: "Seorang pengembang front-end yang berdedikasi dan kreatif, fokus pada React dan antarmuka pengguna modern.",
    foto: "/img/alfarizi.jpg"
  },
  {
    nama: "Sekar Mutiara Mufthi ",
    jurusan: "Teknik Informatika",
    deskripsi: "UI/UX designer yang antusias menciptakan pengalaman pengguna yang intuitif dan menarik.",
    foto: "/img/woman.png"
  },
  {
    nama: "M. Haikal Rayadi",
    jurusan: "Teknik Informatika",
    deskripsi: "Backend developer dengan spesialisasi dalam pengelolaan API dan keamanan data.",
    foto: "/img/man.png"
  }
];

const MEMBERS_PER_SLIDE = 1;

export default function CekMember() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === member.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
  <section id="cek-member" className="scroll-mt-20 py-16 px-6 bg-black text-white">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">Our Team</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {member.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md text-center p-6 hover:shadow-lg transition duration-300"
          >
            <img
              src={item.foto}
              alt={item.nama}
              className="w-24 h-24 object-cover mx-auto mb-4 rounded-full border-4 border-yellow-400"
            />
            <h3 className="text-lg font-bold text-gray-800">{item.nama}</h3>
            <p className="text-sm text-gray-500 italic">{item.jurusan}</p>
            <p className="text-gray-700 mt-2 text-sm">{item.deskripsi}</p>
          </div>
        ))}
      </div>
    </section>
  );
}