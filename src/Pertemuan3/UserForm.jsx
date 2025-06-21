import InputField from "./components/InputField";

export default function UserForm() {
    return (
        <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4">Tambah User</h2>

                {/* Input Nama */}
                <label className="block text-gray-700 font-medium">Nama</label>
                <InputField
                    type="text"
                    placeholder="Masukkan Nama"
                />

                {/* Input Email */}
                <label className="block text-gray-700 font-medium mt-2">Email</label>
                <InputField
                    type="email"
                    placeholder="Masukkan Email"
                />

                {/* Input Tanggal Lahir */}
                <label className="block text-gray-700 font-medium mt-2">Tanggal Lahir</label>
                <InputField
                    type="date"
                    placeholder="Masukkan Tanggal Lahir"
                />

                {/* Tombol Simpan */}
                <button className="w-full bg-green-500 text-white p-2 rounded mt-4">
                    Simpan
                </button>
            </div>
        </div>
    );
}
