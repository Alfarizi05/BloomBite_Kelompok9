import React from 'react';
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from 'react-icons/fa';
import PageHeader from "../components/PageHeader";
import { ordersData } from "../data/OrdersData"; // Pastikan Anda mengimpor data orders

export default function Dashboard() {
  // Filter data berdasarkan status pesanan
  const totalOrders = ordersData.length;
  const totalCompleted = ordersData.filter(order => order.Status === 'Completed').length;
  const totalPending = ordersData.filter(order => order.Status === 'Pending').length;
  const totalCanceled = ordersData.filter(order => order.Status === 'Cancelled').length;

  // Menghitung total revenue
  const totalRevenue = ordersData
    .filter(order => order.Status === 'Completed') // Hanya ambil yang sudah completed
    .reduce((acc, order) => acc + parseFloat(order.TotalPrice), 0);

  return (
    <div id="dashboard-container" className="min-h-screen bg-gray-50 p-5">
      <PageHeader 
        title="Halaman"
        breadcrumb="Dashboard / Pages"
        children1="add"
        children2="export"
        children3="kembali"
      /> 

      <div id="dashboard-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {/* Total Orders */}
        <div id="dashboard-orders" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div id="orders-icon" className="bg-yellow-500 rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div id="orders-info" className="flex flex-col">
            <span id="orders-count" className="text-2xl font-bold">{totalOrders}</span>
            <span id="orders-text" className="text-gray-400">Total Orders</span>
          </div>
        </div>

        {/* Total Completed */}
        <div id="dashboard-completed" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div id="completed-icon" className="bg-green-500 rounded-full p-4">
            <FaTruck className="text-3xl text-white" />
          </div>
          <div id="completed-info" className="flex flex-col">
            <span id="completed-count" className="text-2xl font-bold">{totalCompleted}</span>
            <span id="completed-text" className="text-gray-400">Total Completed</span>
          </div>
        </div>

        {/* Total Pending */}
        <div id="dashboard-pending" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div id="pending-icon" className="bg-yellow-500 rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>
          <div id="pending-info" className="flex flex-col">
            <span id="pending-count" className="text-2xl font-bold">{totalPending}</span>
            <span id="pending-text" className="text-gray-400">Total Pending</span>
          </div>
        </div>

        {/* Total Canceled */}
        <div id="dashboard-canceled" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div id="canceled-icon" className="bg-red-500 rounded-full p-4">
            <FaBan className="text-3xl text-white" />
          </div>
          <div id="canceled-info" className="flex flex-col">
            <span id="canceled-count" className="text-2xl font-bold">{totalCanceled}</span>
            <span id="canceled-text" className="text-gray-400">Total Canceled</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div id="dashboard-revenue" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div id="revenue-icon" className="bg-green-500 rounded-full p-4">
            <FaDollarSign className="text-3xl text-white" />
          </div>
          <div id="revenue-info" className="flex flex-col">
            <span id="revenue-amount" className="text-2xl font-bold">Rp.{totalRevenue.toFixed(2)}</span>
            <span id="revenue-text" className="text-gray-400">Total Revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
