const express = require("express");
const { server } = require("./credentials.js");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("cors")());

require("./routes/index.js")(app);

require("./database/index.js")().then(() =>
  app.listen(server.port, () => {
    console.log("Server started on port " + server.port);
  })
);
