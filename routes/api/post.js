const express = require("express");
const router = express.Router();
const { isSignedIn, isAdmin, isSuperAdmin } = require("../../middleware/auth");
const {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getAllPost,
  toggleLikePost
} = require("../../controllers/post");

//Fire when postId parameter is matched
//store the post details in req.post
router.param("postId", getPostById);

// @route GET api/post
// @desc Test route
// @access Private
router.get("/", isSignedIn, getAllPost);

// @route    PUT api/post/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:postId', isSignedIn, toggleLikePost);

// @route post api/post/create
// @desc Test route
// @access Private
router.post("/create", isSignedIn, createPost);

// @route post api/post/update/:postId
// @desc Test route
// @access Private
router.put("/update/:postId", isSignedIn, updatePost);

// @route post api/post/delete/:postId
// @desc Test route
// @access Private
// Only author can delete post
router.delete("/delete/:postId", isSignedIn, deletePost);

module.exports = router;
