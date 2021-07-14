const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  createPatient,
  logInPatient,
} = require("../controllers/patients.controller");

router.get("/patients", getAllPatients);
router.post("/patients", createPatient);
router.post("/logInPatient", logInPatient);

const {
  getAllReceptions,
  createReception,
  updateReception,
  deleteReception,
} = require("../controllers/receptions.controller");

router.get("/receptions", getAllReceptions);
router.post("/receptions", createReception);
router.put("/receptions", updateReception);
router.delete("/receptions/:id", deleteReception);

module.exports = router;
