export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-12 bg-yellow text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Logo dari folder public/img */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <img
            src="/img/logo.png"
            alt="Bloom & Bite Logo"
            className="h-32 w-32 object-contain"
          />
        </div>

        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-bold text-black-400 mb-4">
            Tentang Bloom & Bite
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
            Bloom & Bite adalah brand gaya hidup modern yang memadukan tiga pilar utama:
            <strong> Bloom</strong> untuk kecantikan dan perawatan diri,
            <strong> Bite</strong> untuk pangan sehat dan lezat, serta furnitur yang estetis dan fungsional.
            Mengusung konsep kesegaran, keindahan, dan kenyamanan, Bloom & Bite menghadirkan
            pengalaman holistik yang menyentuh tubuh, rasa, dan ruang hidup Anda — menciptakan harmoni
            antara inner beauty, mindful eating, dan lingkungan yang tertata indah.
          </p>
        </div>
      </div>
    </section>
  );
}
