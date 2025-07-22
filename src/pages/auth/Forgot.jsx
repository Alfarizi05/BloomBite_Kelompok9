import { Link } from "react-router-dom";

export default function Forgot() {
    return (
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 grid gap-6">
            {/* Logo */}
            <div className="flex justify-center">
                <img src="/public/img/logo.png" className="h-30 w-30" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center">
                Forgot Your Password?
            </h2>

            <p className="text-sm text-gray-500 text-center">
                Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk
                mengatur ulang password Anda.
            </p>

            <form className="grid gap-4">
                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className="w-full bg-gray-100 rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-black text-white font-semibold py-3 rounded-full transition duration-300 transform hover:bg-gray-800 hover:scale-105"
                >
                    Kirim Link Reset
                </button>
            </form>

            {/* Tambahan link navigasi */}
            <div className="text-sm text-center text-gray-500 mt-4">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-black underline">
                    Login di sini
                </Link>
                <br />
                <span className="text-xs">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-black underline">
                        Daftar di sini
                    </Link>
                </span>
            </div>
        </div>
    );
}
