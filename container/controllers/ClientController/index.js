const Client = require("../../models/ClientModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Get all clients:
const fetchClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Add new client :
const addClient = async (req, res) => {
  const client = new Client({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: req.file.filename,
    phone: req.body.phone,
    isValid: false,
  });
  try {
    const newClient = await client.save();
    res.json(newClient);
  } catch (err) {
    res.json({ message: err.message });
  }
};

// update client by ID :
const updateClient = async (req, res) => {
  if (!req.body) {
    return res.send({ message: "They is no DATA !!!" });
  }
  const id = req.params.id;
  Client.findByIdAndUpdate(id, req.body, { userFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.send({ message: "they is no Client with this ID !!!" });
      } else {
        res.send({ message: "Client Updated" });
      }
    }
  );
};

// delete client by ID :
const deleteClient = async (req, res) => {
  Client.findByIdAndDelete(req.params.id).then(() => {
    res.json({ message: "Client Deleted Successfuly" });
  });
};

module.exports = {
  fetchClients,
  addClient,
  updateClient,
  deleteClient,
};
