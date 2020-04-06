require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/url-shortner";
const routes = require("./routers/router");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 7800;

const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
};
//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, err);
  console.log(`Connected to MongoDB`);
});

require("./models/UrlShorten");
app.use("/", express.static(path.join(__dirname, "/client/build")));

app.use(bodyParser.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
