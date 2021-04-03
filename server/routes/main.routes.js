const router = require("express").Router();

router.use("/post", require("./post.routes"));
router.use("/auth", require("./auth.routes"));
router.use("/image", require("./image.routes"));

module.exports = router;
