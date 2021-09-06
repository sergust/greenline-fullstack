const express = require("express");
const router = express.Router();
const { isSignedIn, isAdmin } = require("../../middleware/auth");
const {
  getProducts,
  addProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../../controllers/product");

//Triggers when id parameter is matched
//store the product details in req.product
router.param("productId", getProductById);

//@router api/product/id
//@desc get the individual product
//@access Private
router.get("/:id", isSignedIn, (req, res) => {
  try {
    if (!req.product) {
      throw new Error("Product not found");
    }
    return res.status(200).json(req.product);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Cannot find the product associated with ID" });
    return;
  }
});

// @route Get api/products
// @desc Get all products
// @access Private
router.get("/", isSignedIn, getProducts);

// @route Post api/products
// @desc Add a product
// @access Private
router.post("/", isSignedIn, isAdmin, addProduct);

// @route product api/post/delete/:id
// @desc Test route
// @access Admin
// Only admin can delete post
router.delete("/delete/:id", isSignedIn, isAdmin, deleteProduct);

// @route product api/post/update/:id
// @desc Test route
// @access Admin Route
router.put("/update/:id", isSignedIn, isAdmin, updateProduct);

module.exports = router;
