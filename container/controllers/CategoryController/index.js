const Category = require("../../models/CategoryModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Get all categories:
const fetchGategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Add new category :
const addCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.body.image,
  });
  try {
    const newCategory = await category.save();
    res.json(newCategory);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = {
  fetchGategories,
  addCategory,
};
