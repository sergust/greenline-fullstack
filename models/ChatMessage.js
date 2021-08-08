const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ChatMessageSchema = new Schema({
    chatRoomId: {
      type: ObjectId,
      ref: 'ChatRoom'
    },
    senderId: {
      type: ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
    }
  }, { timestamps: true })

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = ChatMessage;
