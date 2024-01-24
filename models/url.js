// connect to mongodb
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Khaled-Alwakel:Xor3KS9Hm1ffWxpT@cluster0.g1hid9r.mongodb.net/url?retryWrites=true&w=majority",
);

const urlSchema = new mongoose.Schema({
  original: String,
  short: Number,
});

module.exports = mongoose.model("URL", urlSchema);
