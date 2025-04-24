const express = require("express");
const router = express.Router();
const {
  createWebsiteComparison,
  getAllComparisons,
  getComparisonById,
  updateComparison,
  deleteComparison,
} = require("../controllers/comparison.controller");

router.post("/website-comparison", createWebsiteComparison);
router.get("/website-comparison", getAllComparisons);
router.get("/website-comparison/:id", getComparisonById);
router.put("/website-comparison/:id", updateComparison);
router.delete("/website-comparison/:id", deleteComparison);

module.exports = router;
