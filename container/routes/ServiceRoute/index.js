const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/ServiceController");
const multer = require("multer");

// multer config :
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addService",
  upload.single("image"),
  serviceController.addService
);

module.exports = router;
