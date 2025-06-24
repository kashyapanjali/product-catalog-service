const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Hair-Shampoo', price: 120 },
  { id: 2, name: 'Toothpaste-brush1', price: 60 },
  { id: 3, name: 'Sanitary Pads safety kits', price: 80 }
];

// GET /products
router.get('/', (req, res) => {
  res.status(200).json(products);
});

// GET /products/search?keyword=xxx&minPrice=xx&maxPrice=xx
router.get('/search', (req, res) => {
  const { keyword, minPrice, maxPrice } = req.query;
  if (!keyword && !minPrice && !maxPrice) {
    return res.status(400).json({ error: 'At least one query parameter (keyword, minPrice, maxPrice) is required' });
  }

  let results = products;

  if (keyword) {
    results = results.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  if (minPrice) {
    const min = parseFloat(minPrice);
    if (isNaN(min)) {
      return res.status(400).json({ error: 'minPrice must be a valid number' });
    }
    results = results.filter(product => product.price >= min);
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (isNaN(max)) {
      return res.status(400).json({ error: 'maxPrice must be a valid number' });
    }
    results = results.filter(product => product.price <= max);
  }

  res.status(200).json(results);
});

module.exports = router; 