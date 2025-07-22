import React, { useEffect, useState } from "react";
import { productAPI } from "../../services/productAPI";
import { testimoniAPI } from "../../services/testimoniAPI";
import { ourTeamAPI } from "../../services/ourTeamAPI";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";

export default function DashboardHome() {
  const [products, setProducts] = useState([]);
  const [testimoni, setTestimoni] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingTestimoni, setLoadingTestimoni] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoadingProduct(true);
    try {
      const data = await productAPI.fetchProducts();
      setProducts(data);
    } catch (err) {
      setError("Gagal memuat produk.");
    } finally {
      setLoadingProduct(false);
    }
  };

  const loadTestimoni = async () => {
    setLoadingTestimoni(true);
    try {
      const data = await testimoniAPI.fetchAll();
      setTestimoni(data);
    } catch (err) {
      setError("Gagal memuat testimoni.");
    } finally {
      setLoadingTestimoni(false);
    }
  };

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) throw new Error("Gagal mengambil data user");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Gagal memuat data pengguna.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadTeam = async () => {
  setLoadingTeam(true);
  try {
    const data = await ourTeamAPI.fetchAll();
    setTeams(data);
  } catch (err) {
    setError("Gagal memuat data tim.");
  } finally {
    setLoadingTeam(false);
  }
};


useEffect(() => {
  loadProducts();
  loadTestimoni();
  loadUsers();
  loadTeam(); // ← ini
}, []);

  const userRoleData = [
    { name: "Admin", value: users.filter((u) => u.role === "admin").length },
    { name: "User", value: users.filter((u) => u.role === "user").length },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  const topProducts = [...products]
    .sort((a, b) => b.stok - a.stok)
    .slice(0, 5)
    .map((p) => ({ name: p.nama, stok: p.stok }));

  const lowProducts = [...products]
    .sort((a, b) => a.stok - b.stok)
    .slice(0, 5)
    .map((p) => ({ name: p.nama, stok: p.stok }));

  const [teams, setTeams] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(false);


  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

      {/* Statistik Jumlah Admin & User */}
      <section className="bg-white p-6 rounded-xl shadow-md space-y-8">
        <h3 className="text-xl font-semibold text-gray-800">Statistik Pengguna</h3>
        {loadingUsers ? (
          <LoadingSpinner text="Memuat statistik pengguna..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userRoleData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  label
                >
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={userRoleData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
      

      {/* Perbandingan Stok Produk */}
      <section className="bg-white p-6 rounded-xl shadow-md space-y-8">
        <h3 className="text-xl font-semibold text-gray-800">Perbandingan Stok Produk</h3>
        {loadingProduct ? (
          <LoadingSpinner text="Memuat data stok produk..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Produk dengan Stok Terbanyak */}
            <div>
              <h4 className="text-md font-bold text-gray-700 mb-2">Stok Terbanyak</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stok" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Produk dengan Stok Tersedikit */}
            <div>
              <h4 className="text-md font-bold text-gray-700 mb-2">Stok Tersedikit</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={lowProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stok" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </section>
      {/* Our Team */}
<section>
  <h3 className="text-2xl font-semibold mb-4 text-gray-700">Tim Kami</h3>
  {loadingTeam && <LoadingSpinner text="Memuat tim..." />}
  {!loadingTeam && teams.length === 0 && (
    <EmptyState text="Belum ada data tim." />
  )}
  {!loadingTeam && teams.length > 0 && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((person) => (
        <div
          key={person.id}
          className="bg-white border border-gray-100 p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <img
            src={person.foto || "/img/profile-placeholder.png"}
            alt={person.nama}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
          />
          <h4 className="text-lg font-bold text-center text-gray-800">{person.nama}</h4>
          <p className="text-center text-sm text-gray-600">{person.jabatan}</p>
        </div>
      ))}
    </div>
  )}
</section>


      {/* Produk Terbaru */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Produk Terbaru</h3>
        {loadingProduct && <LoadingSpinner text="Memuat produk..." />}
        {!loadingProduct && products.length === 0 && (
          <EmptyState text="Belum ada produk." />
        )}
        {!loadingProduct && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={product.gambar || "/img/logo.png"}
                  alt={product.nama}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h4 className="text-lg font-bold text-gray-800">{product.nama}</h4>
                <p className="text-sm text-gray-500 mt-1">{product.deskripsi}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">Rp {product.harga}</span>
                  <span className="text-sm text-gray-600">Stok: {product.stok}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimoni */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Testimoni Pelanggan</h3>
        {loadingTestimoni && <LoadingSpinner text="Memuat testimoni..." />}
        {!loadingTestimoni && testimoni.length === 0 && (
          <EmptyState text="Belum ada testimoni." />
        )}
        {!loadingTestimoni && testimoni.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimoni.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-100 p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-md font-semibold text-gray-800">{item.nama}</h4>
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                    ⭐ {item.rating}
                  </span>
                </div>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{item.pesan}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
