import React, { useState } from 'react';
import { deleteSweet, purchaseSweet, restockSweet } from '../services/api';
import { toast } from 'react-toastify';
import { Trash2, ShoppingCart, RefreshCcw, Check } from 'lucide-react';

const SweetCard = ({ sweet, onUpdate }) => {
  const [showPurchase, setShowPurchase] = useState(false);
  const [purchaseQty, setPurchaseQty] = useState('');
  const [showRestock, setShowRestock] = useState(false);
  const [restockQty, setRestockQty] = useState('');

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${sweet.name}?`)) return;
    try {
      await deleteSweet(sweet.id);
      toast.success(`${sweet.name} deleted!`);
      onUpdate?.();
    } catch {
      toast.error('Failed to delete sweet!');
    }
  };

  const handlePurchase = async () => {
    const qty = Number(purchaseQty);
    if (!qty || qty <= 0) return toast.error('Enter a valid quantity');
    try {
      await purchaseSweet({ id: sweet.id, quantity: qty });
      toast.success(`Purchased ${qty} × ${sweet.name}`);
      setPurchaseQty('');
      setShowPurchase(false);
      onUpdate?.();
    } catch (err) {
      const msg = err.response?.data?.error || 'Purchase failed!';
      toast.error(msg);
    }
  };

  const handleRestock = async () => {
    const qty = Number(restockQty);
    if (!qty || qty <= 0) return toast.error('Enter a valid quantity');
    try {
      await restockSweet({ id: sweet.id, quantity: qty });
      toast.success(`Restocked ${qty} × ${sweet.name}`);
      setRestockQty('');
      setShowRestock(false);
      onUpdate?.();
    } catch (err) {
      const msg = err.response?.data?.error || 'Restock failed!';
      toast.error(msg);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
      <h3 className="text-xl font-bold text-purple-800 mb-2">{sweet.name}</h3>
      <p className="text-sm text-gray-600 mb-1">Category: {sweet.category}</p>
      <p className="text-sm text-gray-600 mb-1">Price: ₹{sweet.price}</p>
      <p className="text-sm text-gray-600 mb-2">Available: {sweet.quantity}</p>

      <div className="flex gap-2 flex-wrap mt-4">
        <button
          onClick={() => setShowPurchase(!showPurchase)}
          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 text-sm flex items-center gap-1"
        >
          <ShoppingCart size={14} />
          Purchase
        </button>

        <button
          onClick={() => setShowRestock(!showRestock)}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm flex items-center gap-1"
        >
          <RefreshCcw size={14} />
          Restock
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm flex items-center gap-1"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>

      {showPurchase && (
        <div className="mt-3 flex gap-2 items-center">
          <input
            type="number"
            min="1"
            value={purchaseQty}
            onChange={(e) => setPurchaseQty(e.target.value)}
            placeholder="Qty"
            className="border p-2 w-24 text-sm rounded focus:ring focus:ring-yellow-300"
          />
          <button
            onClick={handlePurchase}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1 text-sm"
          >
            <Check size={14} />
            Confirm
          </button>
        </div>
      )}

      {showRestock && (
        <div className="mt-3 flex gap-2 items-center">
          <input
            type="number"
            min="1"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            placeholder="Qty"
            className="border p-2 w-24 text-sm rounded focus:ring focus:ring-indigo-300"
          />
          <button
            onClick={handleRestock}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1 text-sm"
          >
            <Check size={14} />
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default SweetCard;
