const client = require("./Models/Client.js");
const operation = require("./Models/Operation.js");
const order = require("./Models/Order.js");
const connection = require("./Connection.js");

async function Initialize() {
  await client.Initialize(connection);
  await operation.Initialize(connection);
  await order.Initialize(connection);
}

module.exports = Initialize;
