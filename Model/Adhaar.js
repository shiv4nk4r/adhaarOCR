const e = require("express");
const mongoose = require("mongoose");

const adhaarSchema = new mongoose.Schema({
  Value: { type: String, required: true },
  LastEdited: { type: Date, default: Date.now },
  DateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Adhaar", adhaarSchema);
