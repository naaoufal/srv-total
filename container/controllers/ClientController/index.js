const Client = require("../../models/ClientModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = 10;

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
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const client = new Client({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: req.file.filename,
      phone: req.body.phone,
      email: req.body.email,
      password: hash,
      isValid: false,
      createdAt: Date.now(),
    });
    try {
      const newClient = await client.save();
      res.json(newClient);
    } catch (err) {
      res.json({ message: err.message });
    }
  });
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

// auth a client (Json Web Token) :
const clientAuth = async (req, res, next) => {
  const { email, password } = req.body;
  Client.findOne({
    email: email,
  }).then((client) => {
    if (!client) {
      res.json({ message: "Email not found !!!" });
    } else {
      bcrypt.compare(req.body.password, client.password, (err, result) => {
        if (result === true) {
          //   res.json({ message: result });
          const email = req.body.email;
          const password = req.body.password;
          const cl = { clemail: email, clpassword: password };
          const accessToken = jwt.sign(cl, process.env.ACCESS_TOKEN_CLIENT);
          res.json({ accessToken: accessToken });
          res.cl = cl;
          next();
        } else {
          res.json({ message: "Incorrect password" });
        }
      });
    }
  });
};

// Get client by ID :
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.json(client);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  fetchClients,
  addClient,
  updateClient,
  deleteClient,
  clientAuth,
  getClientById,
};
