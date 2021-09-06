const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const product = await Product.find({});

    if (!product) {
      throw new Error("No products found");
    }
    return res.status(200).json({ data: product, size: product.length });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: error.message ? error.message : "Bad request" });
  }
};

// Get the product by ID
exports.getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    req.product = product;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: "Cannot find the product associated with ID" });
    return;
  }
};

// Add a product
exports.addProduct = async (req, res) => {
  try {
    // req.body.author = req.user.id;
    console.log(req.body);

    const product = new Product(req.body);
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot save product in db" });
    return;
  }
};

//delete the existing product
exports.deleteProduct = async (req, res) => {
  try {
    const product = req.product;

    const deletedProduct = await Product.findByIdAndDelete({
      _id: req.product._id,
    });
    return res.status(200).json({ deletedProduct });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message ? error.message : "Cannot delete product" });

    return;
  }
};

//update and return an existing product
exports.updateProduct = async (req, res) => {
  try {
    let { body, image } = req.body;
    const product = req.product;

    product.body = body;
    product.image = image;

    await post.save();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message ? error.message : "Cannot update product",
    });
    return;
  }
};
