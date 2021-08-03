const User = require("../models/User");
const { isAuthorized } = require("../middleware/auth");


//get user profile info
exports.getUserProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      throw new Error("User Profile do not exist");
    }
    const { name, email, role, avatar, phoneNumber, createdAt } = userProfile;

    return res
      .status(200)
      .json({
        profileData: {
          name,
          email,
          role,
          avatar,
          phoneNumber,
          memberSince: createdAt,
        },
      });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message ? error.message : 'Server Error'});

    return;
  }
};

//update user profile
exports.updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
      const {name, avatar, phoneNumber} = req.body;
      //check if user is authorized
      if(!isAuthorized(userId, req.user.id)) {
        throw new Error("Not sufficient Permission");
      }
  
      let userProfile = await User.findById(userId);
      if (!userProfile) {
        throw new Error("User Profile do not exist");
      }

      userProfile.name = name;
      userProfile.avatar = avatar ? avatar : userProfile.avatar;
      userProfile.phoneNumber = phoneNumber;
      
      await userProfile.save();
      res.status(200).json({ success: "User Profile Update Success"})
      return;
    } catch (error) {
      res
        .status(400)
        .json({ error: error.message ? error.message : 'Server Error'});
      return;
    }
  };
  
