const fs = require('fs');
const dataPath = './product.json'

// util functions 
const saveProductData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getProductData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

// Retrieve all products from JSON file
exports.findAll = (req, res) => {
    const products = getProductData()
    res.send(products)
};

//>> Retrieve a Product by Id from JSON file <<
exports.findById = (req, res, next) => {
    try {
        const productId = req.params['id'];
        const products = getProductData();
        const product = products[productId];

        if (products[productId] !== undefined) {

            //>> add the ID of the product to the array <<
            product.id = productId;

            res.send(product);
        } else {
            res.status(404).send('Product not found!');
        }
    } catch (error) {
        next(error);
    }
};

//>> Create a new Product <<
exports.create = (req, res) => {

    var existProducts = getProductData();

    //>> Verify the uniqueness of the Product ID <<
    var newProductId;
    do {
        newProductId = Math.floor(100000 + Math.random() * 900000)
    }
    while (existProducts[newProductId] !== undefined);

    console.log(JSON.stringify(req.body));

    existProducts[newProductId] = req.body;

    console.log(existProducts);

    saveProductData(existProducts);
    res.status(201).send({ success: true, msg: 'product data added successfully' })
};

exports.update = (req, res, next) => {
    try {
        const productId = req.params['id'];
        const products = getProductData();

        if (products[productId] !== undefined) {
            products[productId] = req.body;
            saveProductData(products);
            res.status(200).send({ success: true, msg: 'product data updated successfully' })
        } else {
            res.status(404).send('Product not found!');
        }
    } catch (error) {
        next(error);
    }
};

exports.delete = (req, res, next) => {
    try {
        const productId = req.params['id'];
        var products = getProductData();

        if (products[productId] !== undefined) {

            delete products[productId];
            saveProductData(products);
            res.status(200).send({ success: true, msg: 'product data deleted successfully' })
        } else {
            res.status(404).send('Product not found!');
        }
    } catch (error) {
        next(error);
    }
};