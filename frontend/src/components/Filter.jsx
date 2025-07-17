import React, { useState } from 'react';
import { searchSweets, sortSweets, getSweets } from '../services/api';
import { toast } from 'react-toastify';
import { Search, SortAsc, SortDesc, RefreshCcw } from 'lucide-react';

const FilterSortBar = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      const res = await getSweets();
      onFilter(res.data);
      return;
    }
    try {
      const res = await searchSweets(searchTerm.trim());
      onFilter(res.data);
    } catch {
      toast.error('Search failed!');
    }
  };

  const handleSort = async () => {
    if (!sortBy) return;
    try {
      const res = await sortSweets(sortBy, sortOrder);
      onFilter(res.data);
    } catch {
      toast.error('Sort failed!');
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center border-b pb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
        <Search size={16} /> Search
      </button>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-purple-300"
      >
        <option value="">Sort by...</option>
        <option value="price">Price</option>
        <option value="quantity">Quantity</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-purple-300"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button onClick={handleSort} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2">
        {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />} Sort
      </button>
    </div>
  );
};

export default FilterSortBar;
