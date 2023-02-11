const dotenv = require("dotenv");
const express = require("express");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

dotenv.config();
const app = express();

// middleware
// app.use(express.json())

// routes
app.get("/", (req, res) => {
  res.send("<h2>Store API</h2><a href='/api/v1/products'>products route</a>");
});

// products route
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Server
const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // connect to db

    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
