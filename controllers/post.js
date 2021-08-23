const Post = require("../models/Post");

//get an individual post
exports.getPostById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);
    req.post = post;
    next();
  } catch (error) {
    res.status(400).json({ error: "Cannot find the post associated with Id" });
    return;
  }
};

//get all the post
exports.getAllPost = async (req, res) => {
  const {skip, limit} = req.query;
  try {
    const post = await Post.find({})
    .populate({
      path: "comments",
      select: "commentText commentBy",
      populate: {
        path: "commentBy",
        select: "name avatar"
      }
    })
    .populate({
      path: "author",
      select: "name avatar"
    })
    .sort({_id: -1})
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    if(!post) {
      throw new Error('Oops! Seems empty!')
    }
    return res.status(200).json({ data: post, size: post.length });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: error.message ? error.message : 'Bad request' });
  }
};

//create new user post
exports.createPost = async (req, res) => {
  try {
    req.body.author = req.user.id;

    const post = new Post(req.body);
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot save post in db" });
    return;
  }
};

//update and return an existing post
exports.updatePost = async (req, res) => {
  try {
    let { body, postPicture } = req.body;
    const post = req.post;

    if (JSON.stringify(post.author) !== JSON.stringify(req.user.id)) {
      throw new Error("Not Sufficient Permission");
    }

    post.body = body;
    post.postPicture = postPicture;

    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message ? error.message : 'Cannot update post.'});
    return;
  }
};

exports.toggleLikePost = async (req, res) => {
  try {
    const post = req.post;
    const isLiked = post.likes.findIndex((likedUser) => likedUser.toString() === req.user.id);

    // Check if the post has already been liked
    if (isLiked !== -1) {
      const updatedLikes = post.likes.filter(likedUser => likedUser.toString() !== req.user.id);
      post.likes = updatedLikes;

      await post.save();
      return res.json({ success: 'post unliked success'});
    }

    post.likes.unshift(req.user.id);

    await post.save();

    return res.json({ success: 'post liked success'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

//delete an existing post
exports.deletePost = async (req, res) => {
  try {
    const post = req.post;
    
    if (JSON.stringify(post.author) !== JSON.stringify(req.user.id)) {
        throw new Error("Not Sufficient Permission");
    }

    const deletedPost = await Post.findByIdAndDelete({ _id: req.post._id });
    return res.status(200).json({ deletedPost });
  } catch (error) {
    res.status(400).json({ error: error.message ? error.message : 'Cannot delete post.'});

    return;
  }
};
