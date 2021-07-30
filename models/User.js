const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recentOrders: [
    {
      type: ObjectId,
      ref: 'Order' 
    }
  ],
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user'
  },
  posts: [
    {
      type: ObjectId,
      ref: 'Post'
    }
  ]
}, {timestamps: true});

module.exports = User = mongoose.model("User", UserSchema);
