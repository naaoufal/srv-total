require("dotenv").config();
const jwt = require("jsonwebtoken");
const Client = require("../models/clients");

module.exports = function auth(req, res, next) {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(403);
  }

  const code = jwt.verify(token, process.env.ACCESS_TOKEN_CLIENT);
  const client = Client.findById(code.id);

  if (!client) {
    return res.sendStatus(404);
  }
  req.client = client;
  next();
};
