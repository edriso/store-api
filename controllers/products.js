const getAllProducts = (req, res) => {
  res.status(200).json({ msg: 'Products Array' });
};

module.exports = {
  getAllProducts,
};
