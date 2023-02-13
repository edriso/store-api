const Product = require('../models/product');

const getProductsStatic = async (req, res) => {
  const products = await Product.find({ company: /ikea/i }).select(
    'name price'
  );

  // throw new Error('Whaa!');
  res.status(200).json({ results: products.length, products });
};

const getAllProducts = async (req, res) => {
  const queryObject = {};

  const { featured, company, name, sort, fields } = req.query;

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

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ results: products.length, products });
};

module.exports = {
  getProductsStatic,
  getAllProducts,
};
