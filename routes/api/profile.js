const express = require("express");
const router = express.Router();
const {
  getMyProfile,
  getProfileById,
  createAndUpdateProfile,
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing,
  getAdminPost
} = require("../../controllers/profile");
const { isSignedIn, isAdmin } = require("../../middleware/auth");

// @route POST api/profile
// @desc Get and Update User Profile
// @access Private and Authorized
router.post("/", isSignedIn, createAndUpdateProfile);

// @route GET api/profile/my
// @desc Get the profile information of the user
// @access Private and Authorized
router.get("/my", isSignedIn, getMyProfile);

//@route GET api/profile/admin/adminId/skip/limit
//@desc Get all users post
// @access Private
router.get("/admin/:adminId/:skip/:limit", isSignedIn, isAdmin, getAdminPost);

// @route GET api/profile/:user_id
// @desc Get the profile information of other user
// @access Protected
router.get("/:user_id", isSignedIn, getProfileById);

//add followers and following
//userId and followId is required
router.put("/follow", isSignedIn, addFollowing, addFollower);

//remove followers and following
//userId and unfollowId is required
router.put("/unfollow", isSignedIn, removeFollowing, removeFollower);

module.exports = router;
