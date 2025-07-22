import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const existing = await axios.get("http://localhost:3001/users", {
        params: { username: form.username },
      });

      if (existing.data.length > 0) {
        setError("Username sudah digunakan.");
        return;
      }

      const response = await axios.post("http://localhost:3001/users", {
        username: form.username,
        password: form.password,
        role: "user",
      });

      if (response.status === 201) {
        setSuccess("Registrasi berhasil! Mengarahkan ke login...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar.");
    }
  };

  return (
    <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 grid gap-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/public/img/logo.png" className="h-30 w-30" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 text-center">Daftar Akun</h2>

      {error && (
        <div className="bg-red-100 p-3 text-sm text-gray-700 border border-red-300 rounded flex items-center">
          <BsFillExclamationDiamondFill className="text-red-600 me-2" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 p-3 text-sm text-gray-700 border border-green-300 rounded flex items-center">
          <ImCheckmark className="text-green-600 me-2" />
          {success}
        </div>
      )}

      <form onSubmit={handleRegister} className="grid gap-4">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-full transition duration-300 transform hover:bg-gray-800 hover:scale-105"
        >
          REGISTER
        </button>
      </form>

      <div className="text-sm text-center text-gray-500">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-black underline">
          Login di sini
        </Link>
        <br />
      </div>

    </div>
  );
}
