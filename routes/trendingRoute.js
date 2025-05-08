const express = require("express");
const router = express.Router();
const trendingShortsController = require("../controllers/trendingcontroller");

// CREATE
router.post("/createTrending", trendingShortsController.addTrendingShort);

// READ ALL
router.get("/getAllTrendnig", trendingShortsController.getTrendingShorts);

// READ ONE
router.get("/getOneTrending/:id", trendingShortsController.getTrendingShortById);

// UPDATE
router.put("/updateTrending/:id", trendingShortsController.updateTrendingShort);

// DELETE
router.delete("/deleteTrending/:id", trendingShortsController.deleteTrendingShort);

module.exports = router;
