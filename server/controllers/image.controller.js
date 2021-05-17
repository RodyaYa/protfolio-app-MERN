const fs = require("fs-extra").promises;
const path = require("path");
const uuid = require("uuid").v1;

const { errorMessages, ErrorHandler } = require("../error");

module.exports = {
  uploadImage: async (req, res, next) => {
    try {
      const file = req.files.image;

      if (!file) {
        throw new ErrorHandler(errorMessages.NOT_FOUND, 404);
      }

      const photoDir = path.normalize(process.cwd() + "/uploads/single");
      const fileExtension = file.name.split(".").pop();
      const photoName = `${uuid()}.${fileExtension}`;
      const finalPhotoPath = path.normalize("single/" + photoName);

      await fs.mkdir(photoDir, { recursive: true });
      await file.mv(photoDir + "/" + photoName);

      // res.json({url: `http://locahost:5000/${finalPhotoPath}`});
      // TODO Insert right url

      res.json({
        resourceType: "Files",
        currentFolder: {
          path: "http://localhost:5000/",
          url: finalPhotoPath,
          acl: 255,
        },
        file: {
          url: `http://localhost:5000/${finalPhotoPath}`,
        },
        uploaded: true,
        fileName: photoName,
        success: 1,
      });
    } catch (e) {
      next(e);
    }
  },

  deleteImage: async (req, res, next) => {
    const { path: clearPath } = req.body;
    console.log(clearPath);

    try {
      const photoPath = path.normalize(process.cwd() + "/uploads/" + clearPath);

      if (!photoPath) {
        throw new ErrorHandler(errorMessages.NOT_VALID_BODY.en, 400);
      }

      await fs.unlink(photoPath);

      res.json({ message: "file deleted", ok: true, clearPath });
    } catch (e) {
      if (e.code === "ENOENT") {
        res.json({ removeElem: true, clearPath });
        return;
      }
      next(e);
    }
  },
};
