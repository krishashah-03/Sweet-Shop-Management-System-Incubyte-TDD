import React, { useEffect, useState } from 'react';
import AddSweetForm from '../components/AddSweetForm';
import SweetCard from '../components/SweetCard';
import FilterSortBar from '../components/Filter';
import { getSweets } from '../services/api';
import { Plus, X } from 'lucide-react';

const Home = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
      setFilteredSweets(res.data);
    } catch (err) {
      console.error('Failed to fetch sweets', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">🍬 Sweet Inventory</h2>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 flex items-center gap-2 hover:bg-blue-700"
      >
        {showForm ? <X size={18} /> : <Plus size={18} />}
        {showForm ? 'Hide Form' : 'Add Sweet'}
      </button>

      {showForm && <AddSweetForm onAdd={fetchSweets} />}

      <FilterSortBar onFilter={(data) => setFilteredSweets(data)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredSweets.length > 0 ? (
          filteredSweets.map((sweet) => (
            <SweetCard key={sweet._id} sweet={sweet} onUpdate={fetchSweets} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No sweets available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
