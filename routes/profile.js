const express = require("express");
const router = express.Router();
const profileControllers = require("../controllers/profile");

router.post("/", profileControllers.Create);

module.exports = router;
