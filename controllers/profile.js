const Profile = require("../models/Profile");
const Post = require("../models/Post");
const { URL } = require("url");

//get personal profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//get profile by user ID
exports.getProfileById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await Profile.findOne({
      user: user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

//create and update user profile
exports.createAndUpdateProfile = async (req, res) => {
  // destructure the request
  const {
    website,
    social: {youtube},
    social: {twitter},
    social: {instagram},
    social: {linkedin},
    social: {facebook},
    // spread the rest of the fields we don't need to check
    ...rest
  } = req.body;

  // build a profile
  const profileFields = {
    user: req.user.id,
    website:
      website && website !== "" ? normalize(website, { forceHttps: true }) : "",
    ...rest,
  };

  // Build socialFields object
  const socialFields = { youtube, twitter, instagram, linkedin, facebook };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(socialFields)) {
    if (value && value.length > 0) {
      if (!value.startsWith("https://") && !value.startsWith("http://")) {
        socialFields[key] = `https://${value}`;
      }

      socialFields[key] = new URL(socialFields[key]).href;
    }
  }
  // add to profileFields
  profileFields.social = socialFields;
  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.addFollowing = async (req, res, next) => {
  try {
    await Profile.findOneAndUpdate(
      { user: req.body.userId },
      {
        $addToSet: { following: req.body.followId },
      }
    );
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Unable to follow the user",
    });
  }
};

exports.addFollower = async (req, res) => {
  try {
    let result = await Profile.findOneAndUpdate(
      { user: req.body.followId },
      { $addToSet: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    const { following, followers } = result;
    res.status(200).json({ success: "Followed successfully" });
  } catch (err) {
    return res.status(400).json({
      error: "Error adding followers to the profile",
    });
  }
};

exports.removeFollowing = async (req, res, next) => {
  try {
    const result = await Profile.findOneAndUpdate(
      { user: req.user.id.toString() },
      { $pull: { following: req.body.unfollowId } }
    );
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Unfollow request denied",
    });
  }
};

exports.removeFollower = async (req, res) => {
  try {
    let result = await Profile.findOneAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    result.password = undefined;
    res.status(200).json({success: "Unfollowed successfully"})
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong...",
    });
  }
};

//get admin post
//get all the post
exports.getAdminPost = async (req, res) => {
  const {skip, limit, adminId} = req.params;
  try {
    const post = await Post.find({author: adminId})
    .populate({
      path: "comments",
      select: "commentText commentBy",
      populate: {
        path: "commentBy",
        select: "name avatar"
      },
      options: {
        limit: 3,
        sort: {_id: -1},
        skip: 0
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
