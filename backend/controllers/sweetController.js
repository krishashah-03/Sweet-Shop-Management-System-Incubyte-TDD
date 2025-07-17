const Sweet = require('../models/Sweet');

const createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingSweet = await Sweet.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existingSweet) {
      return res.status(400).json({ error: 'Sweet with this name already exists' });
    }

    const latestSweet = await Sweet.findOne().sort({ id: -1 });
    const nextId = latestSweet ? latestSweet.id + 1 : 1000;

    const newSweet = new Sweet({
      id: nextId,
      name,
      category,
      price: parseInt(price),
      quantity: parseInt(quantity),
    });

    const savedSweet = await newSweet.save();
    res.status(201).json(savedSweet);
  } catch (error) {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ error: error.message });
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
    const deleted = await Sweet.findOneAndDelete({ id: Number(req.params.id) });
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
    const sweet = await Sweet.findOne({ id: Number(id) });
    if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
    if (sweet.quantity < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    sweet.quantity -= quantity;
    await sweet.save();

    console.log(`Original qty: ${sweet.quantity + quantity}, purchase: ${quantity}`);
    res.status(200).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const restockSweet = async (req, res) => {
  const { id, quantity } = req.body;
  try {
    const sweet = await Sweet.findOne({ id: Number(id) });
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

  const validFields = ['price', 'quantity'];
  if (!validFields.includes(by)) {
    return res.status(400).json({ error: 'Invalid sort field' });
  }

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
