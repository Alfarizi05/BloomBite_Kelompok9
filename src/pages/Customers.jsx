import React from "react";
import PageHeader from "../components/PageHeader";
import { Link } from 'react-router-dom';
import { customersData } from "../data/CustomersData"; // ✅ Mengimpor data dari file customersData.js

function CustomerTable() {
  const customers = customersData; // ✅ Menggunakan data dinamis dari customersData

  return (
    <div id="pageheader-container" className="py-6 px-4 md:px-8 lg:px-12">
      <PageHeader
        title="Customers"
        breadcrumb="Customers / Pages"
        children1={<Link to="/customers/add" className="text-white">Add Customer</Link>}
      />
      <p className="mt-2 text-gray-600">Halaman ini menampilkan data pelanggan.</p>

      <div className="mt-4 overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Loyalty</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {customers.map((customer, index) => (
              <tr
                key={customer.CustomerID}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-green-100 transition-colors duration-200`}
              >
                {/* Customer ID */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{customer.CustomerID}</td>
                
                {/* Customer Name */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{customer.CustomerName}</td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{customer.Email}</td>

                {/* Phone */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{customer.Phone}</td>

                {/* Loyalty */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{customer.Loyalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerTable;
