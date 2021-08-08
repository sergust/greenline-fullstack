const express = require("express");
const router = express.Router();
const { isSignedIn } = require("../../middleware/auth");
const {
  getPostById
} = require("../../controllers/post");
const {
    getCommentById, 
    postComment,
    updateComment,
    deleteComment,
} = require("../../controllers/comment");


//Fire when postId parameter is matched
//store the post details in req.post
router.param("postId", getPostById);
//Fire when commentId parameter is matched in the url
//store the comment details in req.comment
router.param("commentId", getCommentById);

// @route post api/comment/post
// @desc Use this route to post comment, post Id is targetted post being commented
// @access Private
router.post("/post/:postId", isSignedIn, postComment);

// @route post api/comment/update/:commentId
// @desc Update or edit comment
// @access Private
router.put("/update/:commentId", isSignedIn, updateComment);

// @route post api/comment/delete/:commentId
// @desc Delete the user comment
// @access Private to comment author
router.delete("/delete/:commentId", isSignedIn, deleteComment);

module.exports = router;
