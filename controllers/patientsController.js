const Patient = require("../models/patient");

/**
 * Gets all patients from MongoDB.
 */
async function getAllPatients(req, res) {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });

        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving patients.",
            error: error.message
        });
    }
}

/**
 * Gets one patient by MongoDB ID.
 */
async function getPatientById(req, res) {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found."
            });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({
            message: "Invalid patient ID."
        });
    }
}

/**
 * Creates a new patient in MongoDB.
 */
async function createPatient(req, res) {
    try {
        const patient = new Patient(req.body);

        const savedPatient = await patient.save();

        res.status(201).json({
            message: "Patient created successfully.",
            patient: savedPatient
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating patient.",
            error: error.message
        });
    }
}

/**
 * Updates an existing patient.
 */
async function updatePatient(req, res) {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPatient) {
            return res.status(404).json({
                message: "Patient not found."
            });
        }

        res.status(200).json({
            message: "Patient updated successfully.",
            patient: updatedPatient
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating patient.",
            error: error.message
        });
    }
}

/**
 * Deletes a patient from MongoDB.
 */
async function deletePatient(req, res) {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPatient) {
            return res.status(404).json({
                message: "Patient not found."
            });
        }

        res.status(200).json({
            message: "Patient deleted successfully."
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid patient ID."
        });
    }
}

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};