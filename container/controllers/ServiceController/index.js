const Service = require("../../models/ServiceModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = 10;

// add new service
const addService = async (req, res) => {
  const service = new Service({
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename,
    createdAt: Date.now(),
  });
  try {
    const newService = await service.save();
    res.json(newService);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  addService,
};
