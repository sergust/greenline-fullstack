const Product = require("../models/Product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category", "name")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found in DB",
        });
      }
      req.product = product;
      next();
    });
};

exports.getProduct = (req, res) => {
  return res.json(req.product);
};

exports.createProduct = async (req, res) => {
  try {
    let product = new Product(req.body);
    product.user = req.user.id;
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: error.message ? error.message : "Cannot save product" });
    return;
  }
};

// delete controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct,
    });
  });
};


//product listing
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("name image category")
    .populate("category", "name")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND",
        });
      }
      res.json(products);
    });
};

//get Product by Id
exports.getProductByCategory = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const { categoryId } = req.params;

  Product.find({category: categoryId.toString()})
    .select("name image category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND",
        });
      }
      res.json(products);
    });
};
