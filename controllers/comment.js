const Comment = require("../models/Comment");

//Middleware to get comment by id
exports.getCommentById = async (req, res, next, id) => {
  try {
    const comment = await Comment.findById(id);
    req.comment = comment;
    next();
  } catch (error) {
    res.status(400).json({ error: "Cannot find the Comment associated with Id" });
    return;
  }
};

//get all the Comment
// exports.getAllComment = async (req, res) => {
//   try {
//     const Comment = await Comment.find({});
//     if(!Comment) {
//       throw new Error('Oops! Seems empty!')
//     }
//     return res.status(200).json({ data: Comment });
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({ error: error.message ? error.message : 'Bad request' });
//   }
// };

//create new user Comment
exports.postComment = async (req, res) => {
  try {
    req.body.commentBy = req.user.id;
    //populated by getPostById middleware
    //req object is added new property post
    //post has value pointed by post id
    const targetPost = req.post;
    const comment = new Comment(req.body);
    targetPost.comments.push(comment._id);

    await comment.save();
    await targetPost.save();

    return res.status(200).json({ data: comment});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot Comment, post may be deleted." });
    return;
  }
};

//update and return an existing Comment
exports.updateComment = async (req, res) => {
  try {
    const comment = req.comment;

    if (JSON.stringify(comment.commentBy) !== JSON.stringify(req.user.id)) {
        throw new Error("Not Sufficient Permission");
    }

    const { commentText } = req.body;
    comment.commentText = commentText;

    await comment.save();
    return res.status(200).json({ updatedComment: comment });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'Cannot update Comment.'});
    return;
  }
};

//delete an existing Comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = req.comment;
    
    if (JSON.stringify(comment.commentBy) !== JSON.stringify(req.user.id)) {
        throw new Error("Not Sufficient Permission");
    }

    const deletedComment = await Comment.findByIdAndDelete({ _id: req.comment._id });
    return res.status(200).json({ deletedComment });
  } catch (error) {
    res.status(400).json({ error: error.message ? error.message : 'Cannot delete post.'});
    return;
  }
};
