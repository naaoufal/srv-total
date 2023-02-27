const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/CategoryController");

router.get("/getCategories", categoryController.fetchGategories);

router.post("/addCategories", categoryController.addCategory);

// router.post("/Auth", adminCon.login);

module.exports = router;
