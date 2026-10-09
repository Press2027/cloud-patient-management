const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./data/database");
const patientRoutes = require("./routes/patients");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from the frontend.
app.use(cors());

// Allow the server to receive JSON data.
app.use(express.json());

app.use("/api/patients", patientRoutes);

// Serve frontend files.
app.use(express.static(path.join(__dirname, "public")));

/**
 * Tests whether the API server is running.
 */
app.get("/api", (req, res) => {
    res.json({
        message: "Cloud Patient Management API",
        status: "Server is running"
    });
});

/**
 * Starts the Express server after connecting to MongoDB.
 */
async function startServer() {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();