const Post = require("../models/PostMemory");
const Draft = require("../models/MemoryDraft");

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      const { tags } = req.query;
      const filterObject = {};

      if (tags) {
        filterObject.tags = { $all: tags.split(";") };
      }

      const posts = await Post.find(filterObject).populate("creator");

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  getPostById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const posts = await Post.findById(id).populate("creator");

      res.json(posts);
    } catch (error) {
      next(error);
    }
  },
  createPost: async (req, res, next) => {
    try {
      const { postBody } = req.body;

      const newPost = new Post(postBody);

      await newPost.save();

      res.json({ data: postBody, status: 201 });
    } catch (error) {
      next(error);
    }
  },
  createDraft: async (req, res, next) => {
    try {
      console.log(req.body);

      const { draftBody } = req.body;

      console.log(draftBody);

      return;

      const newDraft = new Draft(draftBody);

      newDraft.save();
    } catch (error) {
      next(error);
    }
  },
  search: async (req, res, next) => {
    try {
      const { startWith } = req.query;
      const filterObject = {};

      if (startWith) {
        filterObject.title = new RegExp(`^${startWith}`, "i");
      }

      console.log("ФИЛЬТР ==============".filterObject);

      const posts = await Post.find(filterObject).limit(5).exec();

      res.json(posts);
    } catch (e) {
      next(e);
    }
  },
};
