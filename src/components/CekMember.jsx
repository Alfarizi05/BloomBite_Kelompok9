import { useState } from "react";
import member from "../data/member";

export default function CekMember() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const checkMember = () => {
    if (!email || !email.includes("@")) {
      setMessage({ text: "❌ Email tidak valid.", color: "text-white-600" });
      return;
    }

    const foundMember = member.find(m => m.email.toLowerCase() === email.toLowerCase());

    if (foundMember) {
      const colorMap = {
        silver: "text-gray-500",
        gold: "text-yellow-500",
        platinum: "text-purple-500",
      };
      setMessage({
        text: `🧾 Selamat datang, ${foundMember.nama}! Anda adalah member ${foundMember.tipe_member}.`,
        color: colorMap[foundMember.tipe_member],
      });
    } else {
      setMessage({ text: "❌ Email tidak terdaftar sebagai member.", color: "text-green-600" });
    }
  };

  return (
    <section id="cek-member" className="scroll-mt-20 p-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white-600">Cek Keanggotaan</h2>
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Masukkan email Anda"
          className="border px-4 py-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={checkMember}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Cek Sekarang
        </button>
        {message && <div className={`mt-4 font-semibold ${message.color}`}>{message.text}</div>}
      </div>
    </section>
  );
}
