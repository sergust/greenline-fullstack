const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;


const ChatRoomSchema = new Schema({
  participants: [{
      type: ObjectId,
      ref: 'User'
  }],
  roomType: {
    type: String, 
    enum: ['private', 'group'],
    default: 'private'
  }
}, { timestamps: true })



const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
module.exports = ChatRoom;
