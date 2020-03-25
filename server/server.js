const express = require("express");
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost/url-shortner";

const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
};
//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, err);
  console.log(`Connected to MongoDB`);
});
const app = express();
const port = process.env.PORT || 7800;

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});
