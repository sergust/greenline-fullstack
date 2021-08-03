const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../../controllers/profile');
const { isSignedIn } = require("../../middleware/auth");


// @route GET api/profile/userId
// @desc Get the profile information of the user
// @access Private
// @ps only signed in user can view other profiles
router.get('/:userId', isSignedIn, getUserProfile);

// @route PUT api/profile/userId
// @desc UPDATE THE USER PROFILE INPUT
// @access Private
// @ps only authorized user can update their profile
router.put('/:userId', isSignedIn, updateUserProfile);

module.exports = router;