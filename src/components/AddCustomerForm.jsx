// components/AddCustomerForm.js
import React from "react";

function AddCustomerForm() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Tambah Pelanggan Baru</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="CustomerID" className="block text-gray-700 text-sm font-bold mb-2">
            Customer ID:
          </label>
          <input
            type="text"
            id="CustomerID"
            name="CustomerID"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="CustomerName" className="block text-gray-700 text-sm font-bold mb-2">
            Nama Pelanggan:
          </label>
          <input
            type="text"
            id="CustomerName"
            name="CustomerName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="Email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="Phone" className="block text-gray-700 text-sm font-bold mb-2">
            Telepon:
          </label>
          <input
            type="text"
            id="Phone"
            name="Phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="Loyalty" className="block text-gray-700 text-sm font-bold mb-2">
            Loyalty:
          </label>
          <select
            id="Loyalty"
            name="Loyalty"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomerForm;