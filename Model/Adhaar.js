const e = require("express");
const mongoose = require("mongoose");

const adhaarSchema = new mongoose.Schema({
  name: { type: String, required: false },
  dob: { type: String, required: false },
  fatherName: { type: String, required: false },
  gender: { type: String, required: false },
  adhaarNumber: { type: String, required: false },
  LastEdited: { type: Date, default: Date.now },
  DateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Adhaar", adhaarSchema);
