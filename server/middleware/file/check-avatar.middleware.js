const { errorMessages, ErrorHandler } = require("../../error");

module.exports = (req, res, next) => {
  try {
    if (req.photos.length > 1) {
      throw new Error("Just one photo", 400);
    }

    req.avatar = req.photos[0];

    next();
  } catch (e) {
    next(e);
  }
};
