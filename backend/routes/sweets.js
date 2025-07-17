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

router.post('/', createSweet);
router.get('/', getAllSweets);
router.delete('/:id', deleteSweet);
router.post('/purchase', purchaseSweet);
router.post('/restock', restockSweet);
router.get('/search', searchSweets);
router.get('/sort', sortSweets);

module.exports = router;
