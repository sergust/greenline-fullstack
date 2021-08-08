const router = require("express").Router();
const { isSignedIn, isAdmin } = require("../../middleware/auth");
const { createChatRoom, getUserChatRooms } = require("../../controllers/chatroom");

// @route POST api/chatroom
// @desc Create New Conversation
// @access Private
// @ps only signed in user can view other profiles
router.post("/", isSignedIn, isAdmin, createChatRoom);

// @route POST api/chatroom/userId
// @desc userId is the Admin user who is createing a conversation
// @access Private
// @ps only signed in user can view other profiles
router.get("/:userId", isSignedIn, getUserChatRooms);

module.exports = router;
