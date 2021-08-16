const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ProfileSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    company: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    phoneNumber: {
      type: Number,
      trim: true,
      unique: true,
    },
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
      tiktok: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
