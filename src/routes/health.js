const express = require('express');
const router = express.Router();

// GET /health
router.get('/', (req, res) => {
  res.status(200).send('Service is healthy now');
});

module.exports = router; 