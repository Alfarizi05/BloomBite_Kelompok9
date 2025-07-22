import React, { useState, useEffect } from "react";
import { productAPI } from "../../services/productAPI";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import GenericTable from "../../components/GenericTable";
import AlertBox from "../../components/AlertBox";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [dataForm, setDataForm] = useState({
    nama: "",
    harga: "",
    gambar: "",
    deskripsi: "",
    stok: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataForm((prev) => ({
          ...prev,
          gambar: reader.result, // base64
        }));
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Gagal membaca file gambar", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formattedData = {
        ...dataForm,
        harga: parseInt(dataForm.harga),
        stok: parseInt(dataForm.stok),
      };

      if (editingId) {
        await productAPI.updateProduct(editingId, formattedData);
        setSuccess("Produk berhasil diperbarui!");
      } else {
        await productAPI.createProduct(formattedData);
        setSuccess("Produk berhasil ditambahkan!");
      }

      setDataForm({ nama: "", harga: "", gambar: "", deskripsi: "", stok: "" });
      setEditingId(null);
      setShowForm(false);
      loadProducts();
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setDataForm({
      nama: product.nama,
      harga: product.harga,
      gambar: product.gambar || "",
      deskripsi: product.deskripsi || "",
      stok: product.stok,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setDataForm({ nama: "", harga: "", gambar: "", deskripsi: "", stok: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus produk ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      setError("");
      await productAPI.deleteProduct(id);
      loadProducts();
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productAPI.fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat produk.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manajemen Produk</h2>
          <p className="text-gray-500">Kelola produk dengan mudah.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-800 transition"
        >
          Tambah Produk
        </button>
      </div>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-4xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={dataForm.gambar || "/img/logo.png"}
                  alt="Preview Produk"
                  className="rounded-lg shadow-md mb-4 max-w-full h-auto object-cover"
                />
                <p className="text-lg font-semibold mt-2">Preview Gambar</p>
                <p className="text-gray-500 text-sm mt-1">
                  Gambar akan tampil setelah dipilih dari komputer.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">
                  {editingId ? "Edit Produk" : "Tambah Produk Baru"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
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
                      <label className="block text-sm font-medium text-gray-700">Harga</label>
                      <input
                        type="number"
                        name="harga"
                        value={dataForm.harga}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stok</label>
                      <input
                        type="number"
                        name="stok"
                        value={dataForm.stok}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
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

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  >
                    {editingId ? "Update Produk" : "Tambah Produk"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingSpinner text="Memuat data produk..." />}
      {!loading && products.length === 0 && !error && <EmptyState text="Belum ada produk." />}
      {!loading && products.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-black lg font-semibold">
              Daftar Produk ({products.length})
            </h3>
          </div>
          <GenericTable
            columns={["No", "Gambar", "Nama", "Harga", "Stok", "Deskripsi", "Aksi"]}
            data={products}
            renderRow={(product, index) => (
              <>
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4">
                  {product.gambar ? (
                    <img
                      src={product.gambar}
                      alt={product.nama}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400 italic">Tidak ada gambar</span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{product.nama}</td>
                <td className="px-6 py-4 text-gray-600">Rp {product.harga}</td>
                <td className="px-6 py-4">{product.stok}</td>
                <td className="px-6 py-4 text-gray-500">{product.deskripsi}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => handleEdit(product)}>
                    <AiFillEdit className="text-blue-600 text-xl hover:text-blue-800" />
                  </button>
                  <button onClick={() => handleDelete(product.id)}>
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
