const express = require("express");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const patientSchema = new Schema({
  login: String,
  password: String,
});

module.exports = Patient = mongoose.model("patients", patientSchema);
