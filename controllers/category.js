const Category = require("../models/Category");

//category extractor
exports.getCategoryById = async (req, res, next, categoryId) => {
  try {
    const category = await Category.findById({ _id: categoryId.toString() });
    req.category = category;
    next();
  } catch (error) {
    return res.status(404).json({ error: "Category Not Found IN DB" });
  }
};

//create new category
exports.createCategory = async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const doc = await newCat.save();
    res.status(200).json(doc);
  } catch (err) {
    res.status(403).json({ error: "An Error Creating a Category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const targetCategoryId = req.category._id;
    if (!targetCategoryId) {
      throw new Error("Handled by Catch block");
    }

    await Category.findByIdAndRemove({ _id: targetCategoryId });
    return res.status(200).json("Category Successfully deleted");
  } catch (err) {
    return res.status(401).json({ error: "Category might already be deleted" });
  }
};

exports.updateCategory = async (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  try {
    await category.save();
    res.status(200).json({ data: "Category updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not update a category" });
  }
};

exports.getCategory = (req, res) => {
  if (!req.category) {
    return res.status(404).json({ error: "Category not found" });
  }

  return res.status(200).json(req.category);
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "NO any categories" });
  }
};