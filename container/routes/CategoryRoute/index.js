const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/CategoryController");
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

router.get("/getCategories", categoryController.fetchGategories);

router.get("/getCategoryById/:id", categoryController.getCategoryById);

router.post(
  "/addCategory",
  upload.single("image"),
  categoryController.addCategory
);

router.patch("/updateCategory/:id", categoryController.updateCategory);

router.delete("/deleteCategory/:id", categoryController.deleteCategory);

module.exports = router;
