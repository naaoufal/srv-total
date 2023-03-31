const express = require("express");
const router = express.Router();
const vehiculeController = require("../../controllers/VehiculeController");
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
  "/addVehicule",
  upload.single("image"),
  //   adminAccess (middleware),
  vehiculeController.addVehicule
);

router.get(
  "/getVehiculesByCategoryId/:id",
  vehiculeController.getVehiculeByCategoryID
);

router.get("/getVehiculesById/:id", vehiculeController.getVehiculeByID);

router.get(
  "/getVehiculesByServiceId/:id",
  vehiculeController.getVehiculeByServiceID
);

router.get("/getVehicules", vehiculeController.getVehicules);

router.patch("/updateVehicule/:id", vehiculeController.updateVehicule);

router.delete("/deleteVehicule/:id", vehiculeController.deleteVehicule);

module.exports = router;
