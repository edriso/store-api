const Product = require('../models/product');

const getProductsStatic = async (req, res) => {
  const products = await Product.find({ company: /ikea/i });

  // throw new Error('Whaa!');
  res.status(200).json({ products, results: products.length });
};

const getAllProducts = async (req, res) => {
  const queryObject = {};

  const { featured, company, name, sort } = req.query;

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    // queryObject.company = new RegExp(company, 'i');
    queryObject.company = company.toLowerCase();
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }
  const products = await result;

  res.status(200).json({ results: products.length, products });
};

module.exports = {
  getProductsStatic,
  getAllProducts,
};
