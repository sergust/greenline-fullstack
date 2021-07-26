const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const postSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: User,
      trim: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
    },
    postPicture: {
      type: String,
    },
    comments: [
      {
        type: ObjectId,
        ref: User,
      },
    ],
    likes: [
      {
        type: ObjectId,
        ref: User,
        unique: true
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
