const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Shampoo', price: 120 },
  { id: 2, name: 'Toothpaste', price: 60 },
  { id: 3, name: 'Sanitary Pads', price: 80 }
];

// GET /products
router.get('/', (req, res) => {
  res.status(200).json(products);
});

// GET /products/search?keyword=xxx
router.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword query parameter is required' });
  }
  const results = products.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
  res.status(200).json(results);
});

module.exports = router; 