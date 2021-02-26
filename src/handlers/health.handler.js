const healthHandler = (req, res) => {
  res.status(200).json({ message: 'Success' });
};

module.exports = {
  healthHandler,
};
