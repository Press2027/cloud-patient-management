const mongoose = require("mongoose");

/**
 * Connects the application to the MongoDB Atlas cloud database.
 */
async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Atlas connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDatabase;