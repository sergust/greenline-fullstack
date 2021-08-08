const ChatMessage = require("../models/ChatMessage");
const { isAuthorized } = require("../middleware/auth");

exports.saveChatMessage = async (req, res) => {
  const newChatMessage = new ChatMessage(req.body);
  try {
    if (!isAuthorized(req.user.id, req.body?.senderId)) {
      throw new Error("Message cannot be saved");
    }
    const savedChatMessage = await newChatMessage.save();
    res.status(200).json(savedChatMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getChatMessage = async (req, res) => {
  try {
    const ChatMessages = await ChatMessage.find({
      chatRoomId: req.params.chatroomId.toString(),
    });
    res.status(200).json(ChatMessages);
  } catch (err) {
    res.status(500).json(err);
  }
};
