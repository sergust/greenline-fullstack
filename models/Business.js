const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const structureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
    },
    manager:
      {
        type: ObjectId,
        ref: 'User',
      },
    staffs: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ]
  },
  { timestamps: true }
);

const BusinessStructure = mongoose.model("BusinessStructure", structureSchema);
module.exports = BusinessStructure;
