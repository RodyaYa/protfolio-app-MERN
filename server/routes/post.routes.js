const router = require("express").Router();

const { postController } = require("../controllers");

//routes

router.get("/", postController.getPosts);

router.post("/", postController.createPost);

router.get("/search", postController.search);

router.get("/:id", postController.getPostById);

router.post("/draft", postController.createDraft);

//routes end

module.exports = router;
