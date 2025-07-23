import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ourTeamAPI } from "../services/ourTeamAPI";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

export default function CekMember() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await ourTeamAPI.fetchAll();
      setMembers(data);
    } catch (err) {
      console.error("Gagal mengambil data tim:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <section id="cek-member" className="scroll-mt-20 py-16 px-6 bg-black text-white">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">Our Team</h2>

      {loading ? (
        <LoadingSpinner text="Memuat anggota tim..." />
      ) : members.length === 0 ? (
        <EmptyState text="Belum ada anggota tim." />
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {members.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md text-center p-6 hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={item.foto || "/img/profile-placeholder.png"}
                alt={item.nama}
                className="w-24 h-24 object-cover mx-auto mb-4 rounded-full border-4 border-yellow-400"
              />
              <h3 className="text-lg font-bold text-gray-800">{item.nama}</h3>
              <p className="text-sm text-gray-500 italic">{item.jabatan}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
