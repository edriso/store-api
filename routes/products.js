const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.route('/').get(productsController.getAllProducts);

module.exports = router;
