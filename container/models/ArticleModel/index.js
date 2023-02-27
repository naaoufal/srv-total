const mongoose = require("mongoose");

// categories model :

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("articles", articleSchema);
