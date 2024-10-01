const express = require("express");
const morgan = require("morgan");

const config = require("./config");


const app = express();

app.use(morgan("dev"));

//Schemas
require('./models/Status.js');
require('./models/Task.js');

const tasks = require("./routes/task/index.js");
const status = require("./routes/status/index.js");

//Config
app.set("port", config.app.port);

//Rutas
app.use(express.json());
app.use("/api", tasks);
app.use("/api", status);

module.exports = app;
