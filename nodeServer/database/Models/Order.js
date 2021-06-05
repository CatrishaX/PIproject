const { DataTypes } = require("sequelize");
const client = require("../../database/Models/Client.js");
const operation = require("../../database/Models/Operation.js");

async function Initialize(connection) {
  const Order = connection.define("Order", {
    dateToStart: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      trim: true,
    },
  });

  client.Client.hasMany(Order);
  Order.belongsTo(client.Client);

  operation.Operation.hasMany(Order);
  Order.belongsTo(operation.Operation);

  await Order.sync();
  module.exports.Order = Order;
}

module.exports.Initialize = Initialize;
