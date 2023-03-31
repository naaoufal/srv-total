const express = require("express");
const router = express.Router();
const serviceController = require("../../controllers/ServiceController");
const multer = require("multer");
const adminAccess = require("../../middlewares/AdminMiddleware");

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
  // adminAccess,
  serviceController.addService
);

router.get("/getServices", serviceController.getServices);

router.patch(
  "/updateService/:id",
  // adminAccess,
  upload.single("image"),
  serviceController.updateService
);

router.delete(
  "/deleteService/:id",
  // adminAccess,
  serviceController.deleteService
);

router.get("/getServiceById/:id", serviceController.getServiceById);

module.exports = router;
