const express = require("express")
const router = express.Router();
//const fs = require('fs');
const productRoutes = require('./productRoute.js')

router.use(productRoutes)
module.exports = router;