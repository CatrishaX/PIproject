const { DataTypes } = require("sequelize");

async function Initialize(connection) {
  const Client = connection.define("Client", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    phone: {
      type: DataTypes.BIGINT(11),
      validate: {
        isInt: true,
      },
      allowNull: false,
    },
  });
  await Client.sync();
  module.exports.Client = Client;
}

module.exports.Initialize = Initialize;
