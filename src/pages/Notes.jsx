import React, { useState, useEffect } from "react"
import { notesAPI } from "../services/notesAPI"
import PageHeader from "../components/PageHeader"
import { Link } from "react-router-dom"
import GenericTable from "../components/GenericTable"
import AlertBox from "../components/AlertBox"
import EmptyState from "../components/EmptyState"
import LoadingSpinner from "../components/LoadingSpinner"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"

export default function Notes() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [notes, setNotes] = useState([])
  const [editingId, setEditingId] = useState(null)

  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    status: "",
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setDataForm({
      ...dataForm,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (editingId) {
        await notesAPI.updateNote(editingId, dataForm)
        setSuccess("Catatan berhasil diperbarui!")
      } else {
        await notesAPI.createNote(dataForm)
        setSuccess("Catatan berhasil ditambahkan!")
      }

      setDataForm({ title: "", content: "", status: "" })
      setEditingId(null)
      setTimeout(() => setSuccess(""), 3000)
      loadNotes()
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (note) => {
    setDataForm({
      title: note.title,
      content: note.content,
      status: note.status || "",
    })
    setEditingId(note.id)
  }

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus catatan ini?")
    if (!konfirmasi) return

    try {
      setLoading(true)
      setError("")
      setSuccess("")

      await notesAPI.deleteNote(id)
      loadNotes()
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const loadNotes = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await notesAPI.fetchNotes()
      setNotes(data)
    } catch (err) {
      setError("Gagal memuat catatan")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Notes App</h2>
      </div>

      {/* Notifikasi */}
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {editingId ? "Edit Catatan" : "Tambah Catatan Baru"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={dataForm.title}
            placeholder="Judul catatan"
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200"
          />

          <textarea
            name="content"
            value={dataForm.content}
            placeholder="Isi catatan"
            onChange={handleChange}
            required
            rows="2"
            disabled={loading}
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none
                        focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all
                        duration-200 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold
                        rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500
                        focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200 shadow-lg"
          >
            {loading ? "Mohon Tunggu..." : editingId ? "Update Data" : "Tambah Data"}
          </button>
        </form>
      </div>

      {/* Notes Table */}
      {loading && <LoadingSpinner text="Memuat catatan..." />}
      {!loading && notes.length === 0 && !error && (
        <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
      )}
      {!loading && notes.length === 0 && error && (
        <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
      )}

      {!loading && notes.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold">
              Daftar Catatan ({notes.length})
            </h3>
          </div>
          <GenericTable
            columns={["#", "Judul", "Isi Catatan", "Aksi"]}
            data={notes}
            renderRow={(note, index) => (
              <>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {index + 1}.
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-emerald-600">
                    {note.title}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <div className="truncate text-gray-600">{note.content}</div>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(note)}
                    disabled={loading}
                    title="Edit"
                  >
                    <AiFillEdit className="text-blue-500 text-2xl hover:text-blue-700 transition-colors" />
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    disabled={loading}
                    title="Hapus"
                  >
                    <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
                  </button>
                </td>
              </>
            )}
          />
        </div>
      ) : null}
    </div>
  )
}
