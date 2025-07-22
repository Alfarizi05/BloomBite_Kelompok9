import React from "react"

export default function GenericTable({ columns, data, renderRow }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-black text-white text-sm font-semibold">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 text-left whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm text-gray-800">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
