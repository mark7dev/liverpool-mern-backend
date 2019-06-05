const { Router } = require('express');
const app = Router();

const Product = require('../controllers/Product');

app.get('/products', Product.index);
app.get('/products/:Id', Product.read);
// app.delete('/products/:Id', Product.delete);
app.post('/products', Product.create);
// app.put('/products/:Id', Product.update);

module.exports = app;