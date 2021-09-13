const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const OrderSchema = new Schema(
  {
    products: [
      {
        product: { type: ObjectId, ref: "Product", quantity: Number },
        quantity: { type: Number, required: true },
      },
    ],
    client: { ref: "User", type: ObjectId },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
