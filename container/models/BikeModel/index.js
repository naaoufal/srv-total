const mongoose = require("mongoose");

// bikes model :

const bikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  matricule: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  serviceId: {
    type: mongoose.ObjectId(),
    required: true,
  },
  categoryId: {
    type: mongoose.ObjectId(),
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("bikes", bikeSchema);
