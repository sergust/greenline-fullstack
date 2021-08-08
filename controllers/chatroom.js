const ChatRoom = require("../models/ChatRoom");
const { isAuthorized } = require("../middleware/auth");

//create a conversation with the user
exports.createChatRoom = async (req, res) => {
  const newChatRoom = new ChatRoom({
    participants: [req.body.senderId, req.body.receiverId],
  });
  try {
    if (!isAuthorized(req.user.id, req.body.senderId)) {
      throw new Error("Message cannot be saved");
    }

    //check if already exist or not
    const isExist = await ChatRoom.findOne({
      participants: [req.body.senderId, req.body.receiverId],
    });
    if (isExist) {
      throw new Error("Conversation already exist");
    }

    await newChatRoom.save();
    res.status(200).json({ success: "Conversation Created Successfully" });
    return;
  } catch (err) {
    return res.status(500).json({ error: err.message ? err.message : err });
  }
};

//get the users conversation list
exports.getUserChatRooms = async (req, res) => {
  try {
    if (!isAuthorized(req.user.id, req.params.userId)) {
      throw new Error("Unauthorized User");
    }

    const conversation = await ChatRoom.find(
      {
        participants: { $in: [req.params.userId] },
      },
      "participants"
    );
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message ? err.message : err });
  }
};
