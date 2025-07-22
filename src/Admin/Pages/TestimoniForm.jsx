import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { testimoniAPI } from "../../services/testimoniAPI";
import GenericTable from "../../components/GenericTable";
import AlertBox from "../../components/AlertBox";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Testimoni() {
  const [data, setData] = useState([]);
  const [dataForm, setDataForm] = useState({ nama: "", pesan: "", rating: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await testimoniAPI.fetchAll();
      setData(res);
    } catch {
      setError("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await testimoniAPI.update(editingId, dataForm);
        setSuccess("Data berhasil diperbarui!");
      } else {
        await testimoniAPI.create(dataForm);
        setSuccess("Data berhasil ditambahkan!");
      }
      setDataForm({ nama: "", pesan: "", rating: "" });
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
      await testimoniAPI.remove(id);
      loadData();
    } catch {
      setError("Gagal menghapus data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setDataForm({
      nama: item.nama,
      pesan: item.pesan,
      rating: item.rating,
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
          <h2 className="text-3xl font-bold text-gray-800">Testimoni</h2>
          <p className="text-gray-500">Kelola testimoni pelanggan.</p>
        </div>
        <button
          onClick={() => {
            setDataForm({ nama: "", pesan: "", rating: "" });
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
          <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={dataForm.nama}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pesan</label>
                <textarea
                  name="pesan"
                  value={dataForm.pesan}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md p-2 resize-none text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="text"
                  name="rating"
                  value={dataForm.rating}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-black"
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
      )}

      {loading && <LoadingSpinner text="Memuat data..." />}
      {!loading && data.length === 0 && <EmptyState text="Belum ada testimoni." />}
      {!loading && data.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <GenericTable
            columns={["No", "Nama", "Pesan", "Rating", "Aksi"]}
            data={data}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4 font-medium">{item.nama}</td>
                <td className="px-6 py-4 text-gray-500">{item.pesan}</td>
                <td className="px-6 py-4">{item.rating}</td>
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
