const express = require("express");

const router = express.Router();

const {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
} = require("../controllers/patientsController");

/**
 * Gets all patients.
 */
router.get("/", getAllPatients);

/**
 * Gets one patient by ID.
 */
router.get("/:id", getPatientById);

/**
 * Creates a new patient.
 */
router.post("/", createPatient);

/**
 * Updates a patient.
 */
router.put("/:id", updatePatient);

/**
 * Deletes a patient.
 */
router.delete("/:id", deletePatient);

module.exports = router;