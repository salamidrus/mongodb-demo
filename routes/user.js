const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

router.post("/", userControllers.Create);
router.get("/", userControllers.GetAll);

module.exports = router;
