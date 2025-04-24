const express = require("express");
const router = express.Router();
const topsShortsController = require("../controllers/topsShortsController");

router.post("/createTopShorts", topsShortsController.createTopsShorts);
router.get("/getAllTopShorts", topsShortsController.getAllTopsShorts);
router.get("/getTopShortsById/:id", topsShortsController.getTopsShortsById);
router.put("/updateTopShorts/:id", topsShortsController.updateTopsShorts);
router.patch("/toggled/:id", topsShortsController.updateStatus);
router.delete("/deleteTopsShorts/:id", topsShortsController.deleteTopsShorts);

module.exports = router;
