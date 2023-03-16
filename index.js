const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./container/config/mongodb");
const app = express();
const http = require("http");
const server = http.createServer(app);

// connect to database with mongodb :
connectDB();

// use cors middleware :
app.use(express.json());
app.use(cors());

// declaring url endpoints :
app.use("/api/v1/admins", require("./container/routes/AdminRoute"));
app.use("/api/v1/services", require("./container/routes/ServiceRoute"));
app.use("/api/v1/categories", require("./container/routes/CategoryRoute"));
app.use("/api/v1/clients", require("./container/routes/ClientRoute"));

// start the server
server.listen(3001, () => {
  console.log("the server is started on port : 3001");
});
