const express = require("express");
const router = express.Router();

const homeController = require("../controller/home_controller");

// Welcome Page
router.get("/", homeController.home);

router.use("/project", require("./project"));

module.exports = router;
