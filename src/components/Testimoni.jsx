import testimonials from "../data/testimonials";

export default function Testimoni() {
  return (
    <section id="testimoni" className="scroll-mt-20 py-10 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-6">Testimoni Pelanggan</h2>
      <div className="grid md:grid-cols-3 gap-6 px-8">
        {testimonials.slice(0, 9).map((t) => (
          <div key={t.id} className="bg-white shadow p-4 rounded">
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
            <p className="italic">"{t.review}"</p>
            <p className="font-semibold mt-2">- {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
