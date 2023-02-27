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

// Get category by ID :
const getCategoryById = async (req, res) => {
  try {
    // console.log("this is find by ID");
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// Add new category :
const addCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
    image: req.file.filename,
  });
  try {
    const newCategory = await category.save();
    res.json(newCategory);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// update category by ID :
const updateCategory = async (req, res) => {
  if (!req.body) {
    return res.send({ message: "They is no DATA !!!" });
  }
  const id = req.params.id;
  Category.findByIdAndUpdate(id, req.body, { userFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.send({ message: "they is no Category with this ID !!!" });
      } else {
        res.send({ message: "Category Updated" });
      }
    }
  );
};

// delete category by ID :
const deleteCategory = async (req, res) => {
  Category.findByIdAndDelete(req.params.id).then(() => {
    res.json({ message: "Category Deleted Successfuly" });
  });
};

module.exports = {
  fetchGategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
