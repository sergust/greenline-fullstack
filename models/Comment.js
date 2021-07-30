const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const CommentSchema = new Schema({
    commentText: {
        type: String,
        trim: true,
        required: true,
        maxLength: 150,
    },
    commentBy: {
        type: ObjectId,
        ref: 'User'
    },

}, {timestamps: true});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
