const express = require('express');
const {
  createSweet,
  getAllSweets,
  deleteSweet,
  purchaseSweet,
  restockSweet,
  searchSweets,
  sortSweets
} = require('../controllers/sweetController');

const router = express.Router();

//Create
router.post('/', createSweet);

//Get
router.get('/', getAllSweets);

//Delete by ID
router.delete('/:id', deleteSweet);

//Purchase
router.post('/purchase', purchaseSweet);

//Restock
router.post('/restock', restockSweet);

//Search by name/category/price
router.get('/search', searchSweets);

//Sort by price or quantity
router.get('/sort', sortSweets);

module.exports = router;
