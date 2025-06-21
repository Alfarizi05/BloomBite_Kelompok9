import React from "react";
import PageHeader from "../components/PageHeader";
import { Link } from 'react-router-dom';
import { ordersData } from "../data/OrdersData"; // ✅ Mengimpor data dari file ordersData.js

function OrderTable() {
  const orders = ordersData; // ✅ Menggunakan data dinamis dari ordersData

  return (
    <div id="pageheader-container" className="py-6 px-4 md:px-8 lg:px-12">
      <PageHeader
        title="Orders"
        breadcrumb="Orders / Pages"
        children1={<Link to="/orders/add" className="text-white">Add Order</Link>}
      />
      <p className="mt-2 text-gray-600">Halaman ini menampilkan data pesanan.</p>

      <div className="mt-4 overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {orders.map((order, index) => (
              <tr
                key={order.OrderID}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-green-100 transition-colors duration-200`}
              >
                {/* Order ID */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{order.OrderID}</td>
                
                {/* Customer Name */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{order.CustomerName}</td>

                {/* Total Price */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{order.TotalPrice}</td>

                {/* Order Date */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">{new Date(order.OrderDate).toLocaleDateString()}</td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                      order.Status === "Pending"
                        ? "bg-red-500"
                        : order.Status === "Completed"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {order.Status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderTable;
