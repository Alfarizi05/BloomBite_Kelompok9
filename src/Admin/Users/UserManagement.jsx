import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import GenericTable from "../../components/GenericTable";
import AlertBox from "../../components/AlertBox";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [dataForm, setDataForm] = useState({ username: "", password: "", role: "user" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      setError("Gagal memuat data user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.patch(`http://localhost:3000/users/${editingId}`, dataForm);
        setSuccess("User berhasil diperbarui!");
      } else {
        const newUser = { ...dataForm, id: crypto.randomUUID() };
        await axios.post("http://localhost:3000/users", newUser);
        setSuccess("User berhasil ditambahkan!");
      }
      setDataForm({ username: "", password: "", role: "user" });
      setEditingId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus user ini?")) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers();
    } catch (err) {
      setError("Gagal menghapus user.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setDataForm({
      username: user.username,
      password: user.password || "",
      role: user.role,
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manajemen User</h2>
          <p className="text-gray-500">Kelola pengguna dan role akses mereka.</p>
        </div>
        <button
          onClick={() => {
            setDataForm({ username: "", password: "", role: "user" });
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
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={dataForm.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={dataForm.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={dataForm.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-black"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
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

      {loading && <LoadingSpinner text="Memuat data pengguna..." />}
      {!loading && users.length === 0 && <EmptyState text="Belum ada pengguna." />}
      {!loading && users.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <GenericTable
            columns={["No", "Username", "Role", "Aksi"]}
            data={users}
            renderRow={(user, index) => (
              <>
                <td className="px-6 py-4">{index + 1}.</td>
                <td className="px-6 py-4 font-medium">{user.username}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => handleEdit(user)}>
                    <AiFillEdit className="text-blue-600 text-xl hover:text-blue-800" />
                  </button>
                  <button onClick={() => handleDelete(user.id)}>
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
