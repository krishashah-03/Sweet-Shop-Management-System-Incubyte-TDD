const Sweet = require('../models/Sweet');

const createSweet = async (req, res) => {
  try {
    const sweet = new Sweet(req.body);
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find({});
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSweet = async (req, res) => {
  try {
    const deleted = await Sweet.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Sweet not found' });
    }
    res.status(200).json({ message: 'Sweet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const purchaseSweet = async (req, res) => {
  const { id, quantity } = req.body;
  try {
    const sweet = await Sweet.findOne({ id });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    if (sweet.quantity < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    sweet.quantity -= quantity;
    await sweet.save();
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const restockSweet = async (req, res) => {
  const { id, quantity } = req.body;
  try {
    const sweet = await Sweet.findOne({ id });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    if (quantity < 0) return res.status(400).json({ error: 'Invalid restock quantity' });

    sweet.quantity += quantity;
    await sweet.save();
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  let query = {};
  if (name) query.name = new RegExp(name, 'i');
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseFloat(minPrice);
    if (maxPrice) query.price.$lte = parseFloat(maxPrice);
  }

  try {
    const sweets = await Sweet.find(query);
    res.status(200).json(sweets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const sortSweets = async (req, res) => {
  const { by = 'price', order = 'asc' } = req.query;
  const sortOrder = order === 'desc' ? -1 : 1;

  try {
    const sweets = await Sweet.find({}).sort({ [by]: sortOrder });
    res.status(200).json(sweets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSweet,
  getAllSweets,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  searchSweets,
  sortSweets
};
