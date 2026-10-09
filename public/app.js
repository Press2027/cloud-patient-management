const API_URL = "/api/patients";

const patientForm = document.getElementById("patientForm");
const patientList = document.getElementById("patientList");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");

let patients = [];

/**
 * Gets all patients from the Express API.
 */
async function getPatients() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to retrieve patients.");
        }

        patients = await response.json();

        displayPatients(patients);
    } catch (error) {
        patientList.innerHTML =
            `<p class="error">${error.message}</p>`;
    }
}

/**
 * Displays patient records on the webpage.
 */
function displayPatients(patientData) {
    updateDashboard();

    if (patientData.length === 0) {
        patientList.innerHTML =
            "<p>No patients found.</p>";
        return;
    }

    patientList.innerHTML = patientData.map(patient => `
        <article class="patient-card">

            <h3>
                ${patient.firstName} ${patient.lastName}
            </h3>

            <p>
                <strong>Age:</strong>
                ${patient.age}
            </p>

            <p>
                <strong>Gender:</strong>
                ${patient.gender}
            </p>

            <p>
                <strong>Phone:</strong>
                ${patient.phone}
            </p>

            <p>
                <strong>Email:</strong>
                ${patient.email}
            </p>

            <p>
                <strong>Diagnosis:</strong>
                ${patient.diagnosis}
            </p>

            <p>
                <strong>Address:</strong>
                ${patient.address || "Not provided"}
            </p>

            <p>
                <strong>Emergency Contact:</strong>
                ${patient.emergencyContact || "Not provided"}
            </p>

           <button
                class="edit-button"
                onclick="editPatient('${patient._id}')"
            >
                Edit Patient
            </button>

            <button
                class="delete-button"
                onclick="deletePatient('${patient._id}')"
            >
                Delete Patient
            </button>
        </article>
    `).join("");
}

/**
 * Collects form data and creates a new patient.
 */
async function addPatient(event) {

    event.preventDefault();

    const patient = {
        firstName:
            document.getElementById("firstName").value.trim(),

        lastName:
            document.getElementById("lastName").value.trim(),

        age:
            Number(document.getElementById("age").value),

        gender:
            document.getElementById("gender").value,

        phone:
            document.getElementById("phone").value.trim(),

        email:
            document.getElementById("email").value.trim(),

        diagnosis:
            document.getElementById("diagnosis").value.trim(),

        address:
            document.getElementById("address").value.trim(),

        emergencyContact:
            document.getElementById("emergencyContact").value.trim()
    };

    if (!validatePatient(patient)) {
        return;
    }

    try {

        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(patient)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to create patient."
            );
        }

        message.textContent =
            "Patient added successfully.";

        message.className = "success";

        patientForm.reset();

        await getPatients();

    } catch (error) {

        message.textContent = error.message;
        message.className = "error";
    }
}

/**
 * Validates patient information before sending it to the API.
 */
function validatePatient(patient) {

    if (
        !patient.firstName ||
        !patient.lastName ||
        !patient.gender ||
        !patient.phone ||
        !patient.email ||
        !patient.diagnosis
    ) {
        message.textContent =
            "Please complete all required fields.";

        message.className = "error";

        return false;
    }

    if (patient.age < 0) {

        message.textContent =
            "Age cannot be negative.";

        message.className = "error";

        return false;
    }

    return true;
}

/**
 * Updates the dashboard with the total number of patients.
 */
function updateDashboard() {
    const totalPatients = document.getElementById("totalPatients");

    if (totalPatients) {
        totalPatients.textContent = patients.length;
    }
}

/**
 * Checks whether the API server is responding.
 */
async function checkApiStatus() {
    const apiStatus = document.getElementById("apiStatus");

    try {
        const response = await fetch("/api");

        if (!response.ok) {
            throw new Error("API unavailable");
        }

        apiStatus.textContent = "Online";
        apiStatus.style.color = "green";
    } catch (error) {
        apiStatus.textContent = "Offline";
        apiStatus.style.color = "#c0392b";
    }
}

/**
 * Updates a patient's phone number and diagnosis.
 */
async function editPatient(id) {
    // Find the patient selected by the user.
    const patient = patients.find(item => item._id === id);

    if (!patient) {
        message.textContent = "Patient not found.";
        message.className = "error";
        return;
    }

    // Ask the user for updated information.
    const phone = prompt("Enter the new phone number:", patient.phone);

    if (phone === null) return;

    const diagnosis = prompt(
        "Enter the new diagnosis:",
        patient.diagnosis
    );

    if (diagnosis === null) return;

    // Keep the existing record and update the selected fields.
    const updatedPatient = {
        ...patient,
        phone: phone.trim(),
        diagnosis: diagnosis.trim()
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPatient)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to update patient."
            );
        }

        message.textContent = "Patient updated successfully.";
        message.className = "success";

        // Reload the records to show the updated information.
        await getPatients();

    } catch (error) {
        message.textContent = error.message;
        message.className = "error";
    }
}

/**
 * Deletes a patient from the cloud database.
 */
async function deletePatient(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this patient?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to delete patient."
            );
        }

        message.textContent =
            "Patient deleted successfully.";

        message.className = "success";

        await getPatients();

    } catch (error) {

        message.textContent = error.message;
        message.className = "error";
    }
}

/**
 * Filters patients based on the search input.
 */
function searchPatients() {

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const filteredPatients = patients.filter(patient => {

        const fullName =
            `${patient.firstName} ${patient.lastName}`
                .toLowerCase();

        const diagnosis =
            patient.diagnosis.toLowerCase();

        return (
            fullName.includes(searchTerm) ||
            diagnosis.includes(searchTerm)
        );
    });

    displayPatients(filteredPatients);
}

patientForm.addEventListener("submit", addPatient);

searchInput.addEventListener("input", searchPatients);
checkApiStatus();

getPatients();