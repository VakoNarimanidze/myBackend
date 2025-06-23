const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
  {
    id: 1,
    name: "iPhone 14",
    quantity: 10,
    image: "https://example.com/images/iphone14.jpg"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    quantity: 5,
    image: "https://example.com/images/galaxyS23.jpg"
  }
];

// Home route
app.get('/', (req, res) => {
  res.send('<h2>Welcome to the Product API</h2><p>Try <a href="/products">/products</a></p>');
});

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST a new product
app.post('/products', (req, res) => {
  const { name, quantity, image } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    quantity,
    image
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ Corrected PUT route
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, quantity, image } = req.body;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (name) product.name = name;
  if (quantity !== undefined) product.quantity = quantity;
  if (image) product.image = image;

  res.json(product);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', product: deleted[0] });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
