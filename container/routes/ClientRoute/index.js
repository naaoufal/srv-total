const express = require("express");
const router = express.Router();
const clientController = require("../../controllers/ClientController");
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

router.get("/getClients", clientController.fetchClients);

router.post("/addClient", upload.single("image"), clientController.addClient);

router.patch("/updateClient", clientController.updateClient);

router.patch("/deleteClient", clientController.deleteClient);

module.exports = router;
