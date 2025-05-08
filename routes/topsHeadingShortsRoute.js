const express = require("express");
const router = express.Router();
const controller = require("../controllers/topsHeadingShortsController");

// CREATE
router.post("/createTopHeading", controller.addTopsHeadingShort);

// READ ALL
router.get("/getAlltopHeading", controller.getTopsHeadingShorts);

// READ ONE
router.get("/getOneTopHeading/:id", controller.getTopsHeadingShortById);

// UPDATE
router.put("/updateTopHeading/:id", controller.updateTopsHeadingShort);

// DELETE
router.delete("/deleteTopHeading/:id", controller.deleteTopsHeadingShort);

module.exports = router;
