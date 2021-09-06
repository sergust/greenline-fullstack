const express = require("express");
const router = express.Router();
const { isSignedIn, isAdmin } = require("../../middleware/auth");
const {
  getOrders,
  getOrderById,
  addOrder,
} = require("../../controllers/order");

// @route Get api/order
// @desc Get all orders
// @access Admin
router.get("/", isSignedIn, getOrders);

//Triggers when id parameter is matched
//store the order details in req.order
router.param("id", getOrderById);

//@router api/product/id
//@desc get the order
//@access Private
router.get("/:id", isSignedIn, (req, res) => {
  try {
    if (!req.order) {
      throw new Error("Order not found");
    }
    return res.status(200).json(req.order);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Cannot find the product associated with ID" });
    return;
  }
});

// @route Post api/order
// @desc Add an order
// @access Private
router.post("/", isSignedIn, addOrder);

module.exports = router;
