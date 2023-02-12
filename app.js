const dotenv = require('dotenv');
require('express-async-errors');
const express = require('express');

const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');

dotenv.config();
const app = express();

// middleware
// app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send("<h2>Store API</h2><a href='/api/v1/products'>products route</a>");
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Server
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
