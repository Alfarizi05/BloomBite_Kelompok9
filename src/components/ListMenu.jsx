// ListMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

function ListMenu({ menuItems }) {
  return (
    <div className="space-y-2">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="text-gray-700 hover:text-gray-900 block px-4 py-2 rounded-lg"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default ListMenu;
