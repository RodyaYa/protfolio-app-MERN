const router = require("express").Router();

const { imageController } = require("../controllers");
const { fileMiddlewares } = require("../middleware");

router.post("/uploads", fileMiddlewares.checkFile, imageController.uploadImage);
router.post("/delete", imageController.deleteImage);

module.exports = router;
