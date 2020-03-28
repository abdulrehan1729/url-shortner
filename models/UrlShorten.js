const mongoose = require("mongoose");
const { Schema } = mongoose;
const urlShortenSchema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const UrlModel = mongoose.model("UrlShorten", urlShortenSchema);
module.exports = UrlModel;
