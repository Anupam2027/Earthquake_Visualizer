
import React from 'react';

function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-64 p-4 hidden md:block">
      {/* Baad me filters, stats, etc. yahan add kar sakte hain */}
      <div className="font-bold text-lg mb-3">Filters</div>
    </aside>
  );
}

export default Sidebar;
