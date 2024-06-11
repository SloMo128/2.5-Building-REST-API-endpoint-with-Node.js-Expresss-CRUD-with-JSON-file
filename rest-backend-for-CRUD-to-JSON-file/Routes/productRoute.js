const express = require("express");
const productRoutes = express.Router();
const products = require('../controllers/product.controller.js');

//>> Read - get all products from the json file <<
productRoutes.get('/list', products.findAll);

//>> Read 1 - get one product from the json file <<
productRoutes.get('/:id', products.findById);

//>> Insert - using Post to add a new product <<
productRoutes.post('/addproduct', products.create);

//>> Update
productRoutes.put('/update/:id', products.update);

//>> Delete
productRoutes.delete('/delete/:id', products.delete);


//>> load all Products' routes on the router <<
productRoutes.use(productRoutes);

module.exports = productRoutes;