const router = require("express").Router();
const { saveChatMessage, getChatMessage } = require("../../controllers/chatmessage");
const {isSignedIn} = require("../../middleware/auth");

// @route   POST api/chatmessage
// @desc    Save messages to the database
// @access  Private
// Sender call save the messages
router.post("/", isSignedIn, saveChatMessage);

// @route   GET api/chatmessage/chatroomId
// @desc    Get MEssage from database
// @access  Private
// @params chatroomId
router.get("/:chatroomId", isSignedIn, getChatMessage);

module.exports = router;
