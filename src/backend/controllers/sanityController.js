const sanityService = require("../services/sanityService");

exports.test = (req, res) => {
  res.json({ message: "Sanity route working ✅" });
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await sanityService.fetchLocations();
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await sanityService.fetchProducts();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};