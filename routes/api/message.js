const router = require("express").Router();
const {
  createChatMessage,
  getChatMessage,
  getConversations,
} = require("../../controllers/message");
const { isSignedIn } = require("../../middleware/auth");

// @route   POST api/message
// @desc    Save messages to the database
// @access  Private
// Sender call save the messages
router.post("/", isSignedIn, createChatMessage);

//@route Get api/message/conversations
router.get("/conversations", isSignedIn, getConversations);

// @route   GET api/message/chatroomId
// @desc    Get MEssage from database
// @access  Private
// @params chatroomId
router.get("/:id", isSignedIn, getChatMessage);

module.exports = router;
