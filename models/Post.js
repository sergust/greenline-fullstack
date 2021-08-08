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
    likes: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: ObjectId,
        ref: 'Comment',
      },
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
