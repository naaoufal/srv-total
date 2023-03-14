const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/CategoryController");
const multer = require("multer");
const clientAccess = require("../../middlewares/ClientMiddleware");
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

router.get("/getCategories", clientAccess, categoryController.fetchGategories);

router.get(
  "/getCategoryById/:id",
  clientAccess,
  categoryController.getCategoryById
);

router.post(
  "/addCategory",
  upload.single("image"),
  categoryController.addCategory
);

router.patch(
  "/updateCategory/:id",
  adminAccess,
  categoryController.updateCategory
);

router.delete(
  "/deleteCategory/:id",
  adminAccess,
  categoryController.deleteCategory
);

module.exports = router;
