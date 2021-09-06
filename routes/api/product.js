const express = require("express");
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  getProductById,
  getProduct,
  getAllProducts,
  getProductByCategory
} = require("../../controllers/product");
const {
  isSignedIn,
  isSuperAdmin,
  isAdmin,
} = require("../../middleware/auth");

router.param("productId", getProductById);

// @route GET api/product
// @desc Get Product Detail
// @access Private and Admin Access
router.get("/detail/:productId", isSignedIn, isAdmin, getProduct);

//Listing all the products
router.get("/all", isSignedIn, isAdmin, getAllProducts);

//Get product by category
router.get("/:categoryId/all", isSignedIn, isAdmin, getProductByCategory);

// @route POST api/product/create
// @desc Create Product
// @access Private and Super Admin
router.post(
  "/create",
  isSignedIn,
  isSuperAdmin,
  createProduct
);

// @route POST api/product/delete
// @desc Create Product
// @access Private and Super Admin
router.delete(
  "/delete/:productId",
  isSignedIn,
  isSuperAdmin,
  deleteProduct
);

module.exports = router;