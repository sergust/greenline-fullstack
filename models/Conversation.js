const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;


const ConversationSchema = new Schema({
  recipients: [{
      type: ObjectId,
      ref: 'User'
  }],
  text: String,
  media: Array, 
}, { timestamps: true })



const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
