const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const { isAdmin, isSignedIn, } = require("../../middleware/auth");
const { addClient, removeClient, getMyClients } = require("../../controllers/users");


// @route   GET api/users/
// @desc    Test route
// @access  Public
router.get("/", isSignedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please include a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, userId: user.id, role: user.role });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send("server error");
    }
  }
);

// @route   POST api/users/my/client
// @desc    get the client details associated with the admin user
// @access  Admin Route
router.get("/my/client", isSignedIn, isAdmin, getMyClients);

// @route   POST api/users/add
// @desc    Add a user to the client list
// @access  Admin Route
router.put('/add', isSignedIn, isAdmin, addClient)

// @route   POST api/users/remove
// @desc    Remove User from the client list
// @access  Admin Route
router.put('/remove', isSignedIn, isAdmin, removeClient)

module.exports = router;
