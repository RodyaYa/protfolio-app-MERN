const Post = require("../models/PostMemory");

const User = require("../models/user");
const AuthToken = require("../models/AuthToken");
const { validationResult } = require("express-validator");
const { passwordHasher, tokinizer } = require("../helpers");

module.exports = {
  login: async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
          message: "not valid body",
        });
      }

      const { email, password, rememberMe = false } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (user) {
        await User.findOneAndUpdate({ email }, { $set: { isOnline: true } });
      }

      await passwordHasher.compare(password, user.password);

      const token = tokinizer(rememberMe);

      await AuthToken.create({ email, ...token });

      res.json({ token, userId: user._id });
    } catch (error) {
      res.json({ errors: [{ msg: "Wrong email or password" }] });
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.json({
          errors: errors.array(),
          message: "not valid body",
        });
      }

      const { login, email, password } = req.body;

      const hashedPassword = await passwordHasher.hash(password);

      const newUser = new User({
        login,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { userId } = req.body;
      await User.findOneAndUpdate({ _id: userId }, { isOnline: false });
    } catch (error) {
      next(error);
    }
  },
};
