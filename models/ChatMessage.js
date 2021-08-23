const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ChatMessageSchema = new Schema({
    conversation: {
      type: ObjectId,
      ref: 'Conversation'
    },
    sender: {
      type: ObjectId,
      ref: 'User'
    },
    recipient: {
      type: ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
    },
    media: Array,
  }, { timestamps: true })

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = ChatMessage;
