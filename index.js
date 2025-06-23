const express = require('express');
const productsRouter = require('./src/routes/products');
const healthRouter = require('./src/routes/health');

const app = express();
app.use(express.json());

app.use('/products', productsRouter);
app.use('/health', healthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
