import React, { useState } from 'react';
import { addSweet } from '../services/api';
import { toast } from 'react-toastify';

const categories = [
  "Nut-Based", "Milk-Based", "Pastry", "Chocolate", "Candy", "Vegetable-Based"
];

const AddSweetForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '', category: '', price: '', quantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['price', 'quantity'].includes(name) ? Number(value) : value.trim()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSweet(formData);
      toast.success('Sweet added!');
      onAdd?.();
      setFormData({ name: '', category: '', price: '', quantity: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add sweet!';
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-xl shadow-md w-full max-w-md mx-auto mb-8">
      <h2 className="text-xl font-bold mb-4 text-purple-700">➕ Add New Sweet</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Sweet name"
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-purple-500"
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-purple-500"
        required
      >
        <option value="">-- Select category --</option>
        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border border-gray-300 rounded mb-3 focus:ring-2 focus:ring-purple-500"
        required
      />

      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-purple-500"
        required
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Add
      </button>
    </form>
  );
};

export default AddSweetForm;
