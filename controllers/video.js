const Video = require("../models/Video");

//get an individual video info
exports.getVideoById = async (req, res, next, id) => {
  try {
    const video = await Video.findById(id);
    req.video = video;
    next();
  } catch (error) {
    res.status(400).json({ error: "Cannot find the video associated with Id" });
    return;
  }
};

//get all the videos
exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find({});

    if (!videos.length) {
      throw new Error("Database Empty, No video found!");
    }

    return res.status(200).json(videos);
  } catch (err) {
    res
      .status(400)
      .json({
        error: err.message ? err.message : "Unable to fetch the videos.",
      });

    return;
  }
};

//Add new video to the database
exports.createVideo = async (req, res) => {
  try {
    req.body.owner = req.user.id;

    const video = new Video(req.body);
    await video.save();

    return res.status(200).json(video);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot save video information in db" });
    return;
  }
};

//delete an existing video
exports.deleteVideo = async (req, res) => {
  try {
    const video = req.video;

    if (JSON.stringify(video.owner) !== JSON.stringify(req.user.id)) {
      throw new Error("You do not have sufficient permission");
    }

    const deletedVideo = await Video.findByIdAndDelete({ _id: req.video._id });
    return res.status(200).json({ deletedVideo });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message ? error.message : "Cannot delete video." });

    return;
  }
};
