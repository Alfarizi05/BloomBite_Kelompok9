import React, { useState } from "react";
import { testimoniAPI } from "../services/testimoniAPI";

const TestimoniInputForm = ({ onSuccess }) => {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await testimoniAPI.create({ nama, pesan, rating });
      setNama("");
      setPesan("");
      setRating(5);
      onSuccess?.();
    } catch (err) {
      console.error("Gagal mengirim testimoni", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <h3 className="text-xl font-semibold text-center mb-2">Tulis Testimoni</h3>

      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama"
        className="w-full border rounded px-3 py-2"
        required
      />
      <textarea
        value={pesan}
        onChange={(e) => setPesan(e.target.value)}
        placeholder="Pesan"
        className="w-full border rounded px-3 py-2"
        rows={4}
        required
      />
      <select
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="w-full border rounded px-3 py-2"
        required
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} - {r === 5 ? "Sangat Baik" : r === 1 ? "Buruk" : ""}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded"
      >
        {loading ? "Mengirim..." : "Kirim"}
      </button>
    </form>
  );
};

export default TestimoniInputForm;
