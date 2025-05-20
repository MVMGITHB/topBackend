const express = require("express");
const router = express.Router();
const {
  createTag,
  getAllTags,
  getTag,
  deleteTag,
  updateTag,
  updateStatus
} = require("../controllers/tag.controller");


router.post("/createtags", createTag);
router.put("/updatetag/:id", updateTag);
router.get("/tags", getAllTags);
router.patch("/updatetagStatus/:id", updateStatus);

router.get("/getTagBySlugtags/:slug", getTag);


router.delete("/deletetags/:id", deleteTag);

module.exports = router;
