const mongoose = require("mongoose");

// categories model :

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("clients", clientSchema);
