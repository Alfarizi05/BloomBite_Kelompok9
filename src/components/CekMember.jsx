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
    foto: "/img/aisyah.jpg"
  },
  {
    nama: "M. Haikal Rayadi",
    jurusan: "Teknik Informatika",
    deskripsi: "Backend developer dengan spesialisasi dalam pengelolaan API dan keamanan data.",
    foto: "/img/budi.jpg"
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
    <section id="cek-member" className="scroll-mt-20 py-12 px-6 bg-black text-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">Our Team</h2>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <img
              src={member[currentSlide].foto}
              alt={member[currentSlide].nama}
              className="w-full md:w-1/2 rounded-xl shadow-xl object-cover h-[400px]"
            />
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                {member[currentSlide].nama}
              </h3>
              <p className="text-gray-300 italic mb-2">{member[currentSlide].jurusan}</p>
              <p className="text-gray-200">{member[currentSlide].deskripsi}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {member.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition duration-300 ${
                index === currentSlide ? "bg-yellow-400" : "bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}