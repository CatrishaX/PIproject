const Sequelize = require("sequelize");
const { database } = require("../credentials.js");
/*
const connection = new Sequelize(
  database.database,
  database.user,
  database.password,
  {
    dialect: "mysql",
    host: database.host,
    port: database.port,
    define: {
      freezeTableName: true,
    },
  }
);*/

const connection = new Sequelize("sqlite::memory:");

module.exports = connection;
