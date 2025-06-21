import React, { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader"; // Pastikan komponen PageHeader sudah tersedia
import { Link } from 'react-router-dom';
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("https://dummyjson.com/users")
      .then((res) => setUsers(res.data.users))
      .catch(() => setError("Gagal mengambil data pengguna"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner2 className="animate-spin text-4xl text-gray-600" />
        <span className="ml-3 text-gray-600 text-lg">Memuat data pengguna...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        <BsFillExclamationDiamondFill className="text-3xl mr-2" />
        <span className="text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div id="pageheader-container" className="py-6 px-4 md:px-8 lg:px-12">
      <PageHeader
        title="Users"
        breadcrumb="Users / Pages"
        children1={<Link to="/users/add" className="text-white">Add User</Link>}
      />
      <p className="mt-2 text-gray-600">Halaman ini menampilkan data pengguna.</p>

      <div className="mt-4 overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">User ID</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Address</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-green-100 transition-colors duration-200`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{user.firstName} {user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{user.address?.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
