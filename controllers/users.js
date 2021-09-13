const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthorized } = require("../middleware/auth");

exports.addClient = async (req, res) => {
  try {
    const { email, userId } = req.body;

    const targetUser = await User.findOne({
      $or: [{ _id: userId }, { email }],
    });

    const adminUser = await User.findById(req.user.id);

    if (!adminUser) {
      throw new Error("Admin account might be limited");
    }

    if (!targetUser) {
      throw new Error("User do not exist in our database");
    }

    if (adminUser.clients.includes(targetUser._id)) {
      throw new Error("Already added to your client list");
    }

    adminUser.clients.unshift(targetUser._id);
    await adminUser.save();

    return res.status(200).json({ success: "Client has been added" });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ error: error.message ? error.message : "Server Error." });
    return;
  }
};

exports.removeClient = async (req, res) => {
  try {
    const { email, userId } = req.body;

    const targetUser = await User.findOne({
      $or: [{ _id: userId }, { email }],
    });

    const adminUser = await User.findById(req.user.id);

    if (!adminUser) {
      throw new Error("Admin account might be limited");
    }

    if (!targetUser) {
      throw new Error("User do not exist in our database");
    }

    if (!adminUser.clients.includes(targetUser._id.toString())) {
      throw new Error("Already removed from your contact list");
    }

    adminUser.clients = adminUser.clients.filter(
      (cId) => cId.toString() !== targetUser._id.toString()
    );
    await adminUser.save();

    return res
      .status(200)
      .json({ success: "Client has been removed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ error: error.message ? error.message : "Server Error." });
    return;
  }
};

exports.getMyClients = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const adminUser = await User.findById(currentUser);

    if (!adminUser) {
      throw new Error("Sorry user does not exist");
    }

    if (!isAuthorized(currentUser.toString(), adminUser._id.toString())) {
      throw new Error("Unauthorized Access to the resources");
    }

    const clients = await User.find(
      { clients: { $in: adminUser.clients } },
      "name email phoneNumber avatar"
    );

    return res.status(200).json({ membersInfo: clients });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ error: error.message ? error.message : "Server Error." });
    return;
  }
};

exports.searchUser = async (req, res) => {
  try {
    const users = await User.find({
      email: { $regex: req.query.email, $options: "i" },
    })
      .limit(10)
      .select("name email avatar");

    res.json({ users });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User Not Found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Old password do not match" }] });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(200).json({ msg: "Password Changed Successfully!"});
  } catch (err) {
    console.log(err)
    res.status(400).json({error: "Unable to change Password"});
  }
};
