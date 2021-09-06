const express = require("express");
const router = express.Router();

//controllers
const {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  getCategory,
} = require("../../controllers/category");
const {
  isSignedIn,
  isSuperAdmin,
} = require("../../middleware/auth");

router.param("categoryId", getCategoryById);

// @route GET api/category
// @desc Get Product Detail
// @access Private and Admin Access
router.get(
  "/single/:categoryId",
  isSignedIn,
  getCategory
);

//get all categories
router.get("/all", isSignedIn, getAllCategories);


//delete category
router.delete(
  "/delete/:categoryId",
  isSignedIn,
  isSuperAdmin,
  deleteCategory
);

//update category
router.put(
  "/update/:categoryId",
  isSignedIn,
  isSuperAdmin,
  updateCategory
);

//create Category
router.post(
  "/create",
  isSignedIn,
  isSuperAdmin,
  createCategory
);

module.exports = router;