const express = require("express");
const router = express.Router();
const { isSignedIn, isSuperAdmin } = require("../../middleware/auth");
const {
  createVideo,
  deleteVideo,
  getVideoById,
  getAllVideo
} = require("../../controllers/video");

//Fire when videoId parameter is matched
//store the video details in req.video
router.param("videoId", getVideoById);

//@router api/video/videoId
//@desc get the individual post detail
//@access Private
router.get("/single/:videoId", isSignedIn, (req, res) => {
  try {
    if(!req.video) {
      throw new Error('Video not found');
    }
    return res.status(200).json(req.video)
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
    return;
  }
})

// @route GET api/video
// @desc Video route
// @access Private
router.get("/", isSignedIn, getAllVideo);

// @route post api/video/create
// @desc Test route
// @access SuperAdmin Route
router.post("/create", isSignedIn, isSuperAdmin, createVideo);

// @route post api/post/delete/:videoId
// @desc Test route
// @access SuperAdmin
// Only super admin can delete video
router.delete("/delete/:videoId", isSignedIn, isSuperAdmin, deleteVideo);

module.exports = router;
