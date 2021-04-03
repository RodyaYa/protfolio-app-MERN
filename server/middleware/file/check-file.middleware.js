const { errorMessages, ErrorHandler } = require("../../error");
const {
  DOCS_MIMETYPES,
  FILE_MAX_SIZE,
  PHOTO_MAX_SIZE,
  PHOTOS_MIMETYPES,
} = require("../../config/constants");

module.exports = (req, res, next) => {
  try {
    const { files } = req;

    const docs = [];
    const photos = [];

    if (!files) {
      return next();
    }

    const allFiles = Object.values(files);

    for (let i = 0; i < allFiles.length; i++) {
      const { mimetype, size } = allFiles[i];

      if (DOCS_MIMETYPES.includes(mimetype)) {
        if (size > FILE_MAX_SIZE) {
          throw new ErrorHandler(errorMessages.TOO_BIG_FILE.en, 400);
        }

        docs.push(allFiles[i]);
      } else if (PHOTOS_MIMETYPES.includes(mimetype)) {
        if (size > PHOTO_MAX_SIZE) {
          throw new ErrorHandler(errorMessages.TOO_BIG_FILE.en, 400);
        }

        photos.push(allFiles[i]);
      } else {
        throw new ErrorHandler(errorMessages.WRONG_FILE_EXTENSION.en, 400);
      }
    }

    req.photos = photos;
    req.docs = docs;

    next();
  } catch (e) {
    next(e);
  }
};
