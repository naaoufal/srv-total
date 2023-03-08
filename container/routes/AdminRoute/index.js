const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/AdminController");
const multer = require("multer");
const adminAccess = require("../../middlewares/AdminMiddleware");

router.post("/addAdmin", adminController.addAdmin);

router.post("/authAdmin", adminController.adminAuth);

module.exports = router;
