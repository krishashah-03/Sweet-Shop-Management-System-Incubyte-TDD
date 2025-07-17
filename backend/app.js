require('dotenv').config(); // Load .env variables

const express = require('express');
const connectDB = require('./db'); 
const sweetsRoutes = require('./routes/sweets'); 
const mongoose = require('mongoose');

const app = express();

connectDB();

app.use(express.json());

app.use('/sweets', sweetsRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is healthy' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; 
