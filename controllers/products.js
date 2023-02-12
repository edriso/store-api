const Product = require('../models/product');

const getProductsStatic = async (req, res) => {
  const products = await Product.find(
    {
      featured: true,
      company: 'caressa',
    },
    null,
    { strict: false }
  );

  // throw new Error('Whaa!');
  res.status(200).json({ products, results: products.length });
};

const getAllProducts = async (req, res) => {
  const queryObject = {};
  const { featured } = req.query;

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  const products = await Product.find(queryObject).setOptions({
    strict: false,
  });

  res.status(200).json({ results: products.length, products });
};

module.exports = {
  getProductsStatic,
  getAllProducts,
};
