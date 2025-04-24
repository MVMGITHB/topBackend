const express = require("express");
const router = express.Router();
const popularShortsController = require("../controllers/popularShortsController");

router.post("/", popularShortsController.createPopularShorts);
router.get("/", popularShortsController.getAllPopularShorts);
router.get("/:id", popularShortsController.getPopularShortsById);
router.put("/:id", popularShortsController.updatePopularShorts);
router.delete("/:id", popularShortsController.deletePopularShorts);

module.exports = router;
