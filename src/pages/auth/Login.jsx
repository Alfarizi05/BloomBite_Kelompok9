import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { FaUser, FaLock, FaLeaf } from "react-icons/fa"; // << Tambahkan icon logo
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ username: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: {
          username: dataForm.username,
          password: dataForm.password,
        },
      });

      const users = response.data;

      if (users.length === 0) {
        setError("Username atau password salah");
        return;
      }

      const user = users[0];
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      navigate(user.role === "admin" ? "/dashboard" : "/homepage");
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 grid gap-6">
      {/* Logo */}
      <div className="flex justify-center">
        <img src="/public/img/logo.png" className="h-30 w-30" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800 text-center">Login Here!</h2>

      {error && (
        <div className="bg-red-100 p-3 text-sm text-gray-700 border border-red-300 rounded flex items-center">
          <BsFillExclamationDiamondFill className="text-red-600 me-2" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-100 p-3 text-sm text-gray-700 rounded flex items-center">
          <ImSpinner2 className="me-2 animate-spin" />
          Mohon Tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="relative">
          <FaUser className="absolute top-3 left-4 text-gray-400" />
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={dataForm.username}
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-3 left-4 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={dataForm.password}
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-black" />
            Remember Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-3 rounded-full transition duration-300 transform hover:bg-gray-800 hover:scale-105"
        >
          LOGIN
        </button>
      </form>

      <p className="text-sm text-center text-gray-500">
        Don’t have an account?{" "}
        <Link to="/register" className="text-black underline">
          Create your account here!
        </Link>
      </p>

      <div className="text-sm text-center text-gray-500 mb-4">
        <Link to="/forgot" className="text-black underline">
          Lupa password?
        </Link>
      </div>
    </div>
  );
}
