const Vehicule = require("../../models/VehiculeModel");
require("dotenv").config();

// add new vehicule :
const addVehicule = async (req, res) => {
  const vehicule = new Vehicule({
    name: req.body.name,
    matricule: req.body.matricule,
    description: req.body.description,
    serviceId: req.body.serviceId,
    categoryId: req.body.categoryId,
    image: req.file.filename,
    createdAt: Date.now(),
  });
  try {
    const newVehicule = await vehicule.save();
    res.json(newVehicule);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get all vehicules :
const getVehicules = async (req, res) => {
  try {
    const vehicules = await Vehicule.find();
    res.json(vehicules);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// update a vehicule :
const updateVehicule = async (req, res) => {
  if (!req.body) {
    return res.send({ message: "They is non DATA !!!" });
  }
  const id = req.params.id;
  Vehicule.findByIdAndUpdate(id, req.body, { userFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.send({ message: "they is no vehicule with this ID !!!" });
      } else {
        res.send({ message: "Vehicule updated" });
      }
    }
  );
};

// get vehicule by ID :
const getVehiculeByID = async (req, res) => {
  try {
    const vehicule = await Vehicule.findById(req.params.id);
    res.json(vehicule);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get all vehicules with same service ID :
const getVehiculeByServiceID = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({ serviceId: req.params.id });
    res.json(vehicules);
    s;
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get all vehicules with same category ID :
const getVehiculeByCategoryID = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({ categoryId: req.params.id });
    res.json(vehicules);
    s;
  } catch (error) {
    res.json({ message: error.message });
  }
};

// delete vehicule by ID :
const deleteVehicule = async (req, res) => {
  Vehicule.findByIdAndDelete(req.params.id).then(() => {
    res.json({ message: "Vehicule Deleted Successfuly" });
  });
};

module.exports = {
  addVehicule,
  getVehicules,
  deleteVehicule,
  updateVehicule,
  getVehiculeByID,
  getVehiculeByServiceID,
  getVehiculeByCategoryID,
};
