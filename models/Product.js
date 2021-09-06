const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
      type: String,
      required: true,
    },
    additionalInfo: {
      surfaces: String,
      directions: String,
      activeIngredients: String,
      cautions: String,
      shelfLife: String,
    },
    additionalDocuments: [{
      public_id: String,
      fileName: String,
      url: String,
    }]
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

