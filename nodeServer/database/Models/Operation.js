const { DataTypes } = require("sequelize");

async function Initialize(connection) {
  const Operation = connection.define("Operation", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    price: {
      type: DataTypes.BIGINT,
      validate: {
        isInt: true,
        len: [1, 6],
      },
      allowNull: false,
      trim: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      trim: true,
    },
  });
  await Operation.sync();
  module.exports.Operation = Operation;
}

module.exports.Initialize = Initialize;
