import React, { useState, useEffect } from "react";
import { bookingAPI } from "../../services/bookingAPI";
import { AiFillDelete } from "react-icons/ai";
import GenericTable from "../../components/GenericTable";
import AlertBox from "../../components/AlertBox";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function BookingAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await bookingAPI.fetchBookings();
      setBookings(data);
    } catch (err) {
      setError("Gagal memuat data booking.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus booking ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await bookingAPI.deleteBooking(id);
      setSuccess("Booking berhasil dihapus.");
      loadBookings();
    } catch (err) {
      setError("Gagal menghapus booking: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Booking</h2>
      <p className="text-gray-500 mb-6">Lihat dan kelola semua pemesanan.</p>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}
      {loading && <LoadingSpinner text="Memuat data booking..." />}
      {!loading && bookings.length === 0 && <EmptyState text="Belum ada booking." />}

      {!loading && bookings.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h3 className="text-black font-semibold">
              Daftar Booking ({bookings.length})
            </h3>
          </div>
          <GenericTable
            columns={[
              "No",
              "Nama Pemesan",
              "Alamat",
              "Produk",
              "Jumlah",
              "Total Harga",
              "Tanggal",
              "Aksi",
            ]}
            data={bookings}
            renderRow={(booking, index) => (
              <>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{booking.nama_pemesan}</td>
                <td className="px-6 py-4 text-gray-600">{booking.alamat}</td>
                <td className="px-6 py-4">{booking.product_nama}</td>
                <td className="px-6 py-4">{booking.jumlah}</td>
                <td className="px-6 py-4">
                  Rp {(booking.product_harga * booking.jumlah).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  {new Date(booking.created_at).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(booking.id)}>
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
