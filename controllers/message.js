const ChatMessage = require("../models/ChatMessage");
const Conversations = require("../models/Conversation");
const { isAuthorized } = require("../middleware/auth");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.createChatMessage = async (req, res) => {
  try {
    const { recipient, text, media } = req.body;

    if (!isAuthorized(req.user.id, req.body.sender)) {
      throw new Error("Message cannot be saved");
    }

    if (!recipient || (!text.trim() && media.length === 0)) return;

    const newConversation = await Conversations.findOneAndUpdate(
      {
        $or: [
          { recipients: [req.user.id, recipient] },
          { recipients: [recipient, req.user.id] },
        ],
      },
      {
        recipients: [req.user.id, recipient],
        text,
        media,
      },
      { new: true, upsert: true }
    );

    const newMessage = new ChatMessage({
      conversation: newConversation._id,
      sender: req.user.id,
      recipient,
      text,
      media,
    });

    await newMessage.save();

    res.json({ msg: "Created." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getChatMessage = async (req, res) => {
  try {
    const features = new APIfeatures(
      ChatMessage.find({
        $or: [
          { sender: req.user.id, recipient: req.params.id },
          { sender: req.params.id, recipient: req.user.id },
        ],
      }),
      req.query
    ).paginating();

    const messages = await features.query.sort("-createdAt");

    res.json({
      messages,
      result: messages.length,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const features = new APIfeatures(
      Conversations.find({
        recipients: req.user.id.toString(),
      }),
      req.query
    ).paginating();

    const conversations = await features.query
      .sort("-updatedAt")
      .populate("recipients", "avatar name email");

    res.json({
      conversations,
      result: conversations.length,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
