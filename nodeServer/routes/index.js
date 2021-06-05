const express = require("express");
const path = require("path");

module.exports = (app) => {
  app.use("/api/client", require("./api/Client.js")(express.Router()));
  app.use("/api/operation", require("./api/Operation.js")(express.Router()));
  app.use("/api/order", require("./api/Order.js")(express.Router()));

  app.use("/", (req, res) => {
    res.status(200).sendfile(path.join(__dirname, "../public", "index.html"));
  });
};
