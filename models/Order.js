const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const OrderSchema = new Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
        quantity: Number,
        user: { ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = OrderSchema;
