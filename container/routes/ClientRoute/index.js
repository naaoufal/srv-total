const express = require("express");
const router = express.Router();
const clientController = require("../../controllers/ClientController");
const multer = require("multer");
const clientAccess = require("../../middlewares/ClientMiddleware");

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

router.patch("/updateClient", clientAccess, clientController.updateClient);

router.patch("/deleteClient", clientAccess, clientController.deleteClient);

router.post("/authClient", clientController.clientAuth);

module.exports = router;
