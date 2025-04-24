const express = require("express");
const router = express.Router();
const {
  createTag,
  getAllTags,
  getTag,
  deleteTag,
} = require("../controllers/tag.controller");


router.post("/tags", createTag);


router.get("/tags", getAllTags);


router.get("/tags/:slug", getTag);


router.delete("/tags/:slug", deleteTag);

module.exports = router;
