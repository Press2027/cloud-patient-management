const mongoose = require("mongoose");

/**
 * Defines the structure and validation rules for patient records.
 */
const patientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        age: {
            type: Number,
            required: true,
            min: 0
        },

        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Other"]
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        diagnosis: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            trim: true
        },

        emergencyContact: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

// Exports the Patient model for use in the controller.
module.exports = mongoose.model("Patient", patientSchema);