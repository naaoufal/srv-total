const Service = require("../../models/ServiceModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = 10;

// add new service :
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

// get all services :
const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get service by ID :
const getServiceById = async () => {
  try {
    const service = await Service.findById(req.params.id);
    res.json(service);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// update service by ID :
const updateService = async (req, res) => {
  if (!req.body) {
    return res.send({ message: "They is non DATA !!!" });
  }
  const id = req.params.id;
  Service.findByIdAndUpdate(id, req.body, { userFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.send({ message: "they is no service with this ID !!!" });
      } else {
        res.send({ message: "Service updated" });
      }
    }
  );
};

// delete service by ID :
const deleteService = async (req, res) => {
  Service.findByIdAndDelete(req.params.id).then(() => {
    res.json({ message: "Service Deleted Successfuly" });
  });
};

module.exports = {
  addService,
  getServices,
  updateService,
  deleteService,
  getServiceById,
};
