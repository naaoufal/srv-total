const Client = require("../../models/ClientModel");
const Admin = require("../../models/AdminModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const saltRounds = 10;

// add new admin
const addAdmin = async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hash, //req.body.password,
    });
    try {
      const newAdmin = await admin.save();
      res.json(newAdmin);
    } catch (err) {
      res.json({ message: err.message });
    }
  });
};

// auth an admin (Json Web Token) :
const adminAuth = async (req, res, next) => {
  const { email, password } = req.body;
  Admin.findOne({
    email: email,
  }).then((admin) => {
    if (!admin) {
      res.json({ message: "Email not found !!!" });
    } else {
      bcrypt.compare(req.body.password, admin.password, (err, result) => {
        if (result === true) {
          const email = req.body.email;
          const password = req.body.password;
          const ad = { ademail: email, adpassword: password };
          const accessToken = jwt.sign(ad, process.env.ACCESS_TOKEN_ADMIN);
          res.json({ accessToken: accessToken });
          res.ad = ad;
          next();
        } else {
          res.json({ message: "Incorrect password" });
        }
      });
    }
  });
};

module.exports = {
  addAdmin,
  adminAuth,
};
