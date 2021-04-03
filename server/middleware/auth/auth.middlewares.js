const User = require("../../models/user");

module.exports = {
  checkIsUserPresentByEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userByEmail = await User.findOne({ email });

      if (userByEmail) {
        throw new Error("User already exist", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
