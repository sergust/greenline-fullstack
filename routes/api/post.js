const express = require("express");
const router = express.Router();
const { isSignedIn, isAdmin } = require("../../middleware/auth");
const {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getAllPost,
  toggleLikePost,
} = require("../../controllers/post");

//Fire when postId parameter is matched
//store the post details in req.post
router.param("postId", getPostById);

//@router api/post/postId
//@desc get the individual post detail
//@access Private
router.get("/:postId", isSignedIn, (req, res) => {
  try {
    if(!req.post) {
      throw new Error('Post not found');
    }
    return res.status(200).json(req.post)
  } catch (error) {
    res.status(400).json({ error: "Cannot find the post associated with Id" });
    return;
  }
})

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
// @access Admin Route
router.post("/create", isSignedIn, isAdmin, createPost);

// @route post api/post/update/:postId
// @desc Test route
// @access Admin Route
router.put("/update/:postId", isSignedIn, isAdmin, updatePost);

// @route post api/post/delete/:postId
// @desc Test route
// @access Admin
// Only author can delete post
router.delete("/delete/:postId", isSignedIn, isAdmin, deletePost);

module.exports = router;
