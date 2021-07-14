const express = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const receptionSchema = new Schema({
  patient: String,
  doctor: String,
  data: String,
  complaints: String,
});

module.exports = Reception = mongoose.model("receptions", receptionSchema);
