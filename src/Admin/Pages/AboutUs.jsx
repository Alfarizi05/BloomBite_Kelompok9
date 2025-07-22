import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { aboutUsAPI } from "../../services/aboutUsAPI";
import GenericTable from "../../components/GenericTable";
import AlertBox from "../../components/AlertBox";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AboutUs() {
  const [data, setData] = useState([]);
  const [dataForm, setDataForm] = useState({ title: "", deskripsi: "", gambar: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await aboutUsAPI.fetchAll();
      setData(res);
    } catch {
      setError("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setDataForm(prev => ({
        ...prev,
        gambar: reader.result, // base64 result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await aboutUsAPI.update(editingId, dataForm);
        setSuccess("Data berhasil diperbarui!");
      } else {
        await aboutUsAPI.create(dataForm);
        setSuccess("Data berhasil ditambahkan!");
      }
      setDataForm({ title: "", deskripsi: "", gambar: "" });
      setEditingId(null);
      setShowForm(false);
      loadData();
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus data ini?")) return;
    setLoading(true);
    try {
      await aboutUsAPI.remove(id);
      loadData();
    } catch (err) {
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setDataForm({
      title: item.title,
      deskripsi: item.deskripsi,
      gambar: item.gambar || "",
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Tentang Kami</h2>
          <p className="text-gray-500">Kelola informasi tentang kami.</p>
        </div>
        <button
          onClick={() => {
            setDataForm({ title: "", deskripsi: "", gambar: "" });
            setEditingId(null);
            setShowForm(true);
          }}
          className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800"
        >
          Tambah
        </button>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-3xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <img
                  src={dataForm.gambar || "/img/logo.png"}
                  alt="Preview"
                  className="rounded-lg shadow-md mb-4 max-w-full h-auto"
                />
                <p className="text-gray-500 text-sm">Gambar akan muncul setelah dipilih.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Judul</label>
                  <input
                    type="text"
                    name="title"
                    value={dataForm.title}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md p-2 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                  <textarea
                    name="deskripsi"
                    value={dataForm.deskripsi}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-md p-2 resize-none text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Gambar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-black"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Tambah"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner text="Memuat data..." />}
      {!loading && data.length === 0 && <EmptyState text="Belum ada data." />}
      {!loading && data.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <GenericTable
            columns={["No", "Gambar", "Judul", "Deskripsi", "Aksi"]}
            data={data}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4">
                  {item.gambar ? (
                    <img
                      src={item.gambar}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-gray-500">{item.deskripsi}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => handleEdit(item)}>
                    <AiFillEdit className="text-blue-600 text-xl hover:text-blue-800" />
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <AiFillDelete className="text-red-500 text-xl hover:text-red-700" />
                  </button>
                </td>
              </>
            )}
          />
        </div>
      )}
    </div>
  );
}
