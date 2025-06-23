import { BsFlower1 } from "react-icons/bs";
import { GiFruitBowl } from "react-icons/gi";
import { LuSofa } from "react-icons/lu";

export default function AboutPage() {
  return (
   <section id="aboutpage" className="scroll-mt-20 p-8 text-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
          Tentang Bloom & Bite
        </h1>
        <p className="max-w-3xl mx-auto text-yellow-300 leading-relaxed">
          Bloom & Bite adalah brand gaya hidup modern yang memadukan tiga pilar utama:
          <br />
          <span className="text-yellow-400 font-medium">Bloom</span> untuk kecantikan dan perawatan diri,
          <span className="text-yellow-400 font-medium"> Bite</span> untuk pangan sehat dan lezat,
          serta <span className="text-yellow-400 font-medium">Furniture</span> yang estetis dan fungsional.
          <br />
          Kami percaya bahwa kecantikan, nutrisi, dan kenyamanan adalah satu kesatuan hidup.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="border border-yellow-500 rounded-xl p-6 bg-yellow-900/10 hover:bg-yellow-700/10 transition">
          <BsFlower1 className="text-5xl mx-auto mb-4 text-yellow-300" />
          <h3 className="text-xl font-bold mb-2 text-yellow-200">Bloom</h3>
          <p>Kecantikan alami, skincare, dan self-care yang mendukung percaya diri dan inner glow.</p>
        </div>
        <div className="border border-yellow-500 rounded-xl p-6 bg-yellow-900/10 hover:bg-yellow-700/10 transition">
          <GiFruitBowl className="text-5xl mx-auto mb-4 text-yellow-300" />
          <h3 className="text-xl font-bold mb-2 text-yellow-200">Bite</h3>
          <p>Makanan sehat, bergizi, dan menggugah selera yang menyatu dengan gaya hidup aktif.</p>
        </div>
        <div className="border border-yellow-500 rounded-xl p-6 bg-yellow-900/10 hover:bg-yellow-700/10 transition">
          <LuSofa className="text-5xl mx-auto mb-4 text-yellow-300" />
          <h3 className="text-xl font-bold mb-2 text-yellow-200">Furniture</h3>
          <p>Desain ruang yang nyaman dan estetis — memperindah setiap sudut kehidupan Anda.</p>
        </div>
      </div>
    </section>
  );
}
