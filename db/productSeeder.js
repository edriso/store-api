require('dotenv').config();

const connectDB = require('./connect');
const Product = require('../models/product');
const productFactory = require('./productFactory.json');

const productSeeder = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(productFactory);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

productSeeder();
