const router = require("express").Router();
const { isSignedIn, isAdmin } = require("../../middleware/auth");
const { createChatRoom, getUserChatRooms } = require("../../controllers/chatroom");

// @route POST api/chatroom
// @desc Create New Conversation
// @access Protected
router.post("/", isSignedIn, createChatRoom);

// @route GET api/chatroom/userId
// @desc get user conversation history.
// @access Private
router.get("/:userId", isSignedIn, getUserChatRooms);

module.exports = router;
