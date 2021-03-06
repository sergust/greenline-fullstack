const Order = require("../models/Order");
const absorb = require("absorb");

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const user = req.user.id;
    let order = await Order.find().populate("products.product");

    if (!order) {
      throw new Error("No orders found");
    }

    // order = order.filter((order) => order.client === user);

    return res.status(200).json({ data: order, size: order.length });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ error: error.message ? error.message : "Bad request" });
  }
};

// Get the order by ID
exports.getOrderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id);
    req.order = order;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: "Cannot find the product associated with ID" });
    return;
  }
};

// Add an order
exports.addOrder = async (req, res) => {
  try {
    req.body.client = req.user.id;
    console.log(req.user);
    delete req.body._id;

    const order = new Order(req.body);
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot save order in db" });
    return;
  }
};
