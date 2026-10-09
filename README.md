Description

The Cloud Patient Management System is a web application developed for the BYU–Idaho CSE 310 course, Module 3: Cloud Databases. It allows users to manage patient records through a web interface connected to a cloud-hosted MongoDB Atlas database.

The project demonstrates how to build a REST API using Node.js and Express, store and retrieve records from a cloud database using Mongoose, and create an interactive frontend using HTML, CSS, and JavaScript.

## Features

Add new patient records

View all patient records

Search patients by name or diagnosis

Update patient phone numbers and diagnoses

Delete patient records

Validate patient information

Store patient records in MongoDB Atlas

Display a dashboard with the total number of patients

Check whether the API server is responding

Responsive interface for desktop and mobile devices

## Programming Concepts Demonstrated

JavaScript variables and data types

Functions and asynchronous functions

Conditional statements

Arrays and array methods

Event listeners and form handling

Input validation

Promises and async/await

JSON data exchange

HTTP methods and REST API endpoints

Error handling with try/catch

Database schemas and data validation

CRUD operations: Create, Read, Update, and Delete

## Technologies Used

JavaScript — frontend functionality and application logic

Node.js — JavaScript runtime

Express.js — REST API and web server

MongoDB Atlas — cloud database

Mongoose — MongoDB object modeling

HTML5 — webpage structure

CSS3 — styling and responsive layout

dotenv — environment variable configuration

cors — cross-origin resource sharing

Git and GitHub — version control and source code hosting

## How to Run

Before running the application, install or configure:

Node.js and npm

A MongoDB Atlas account and database cluster

Git (optional for local execution)

Installation and Setup

1. Clone the Repository

Replace the example URL with your actual GitHub repository URL.

git clone YOUR_GITHUB_REPOSITORY_URL
cd cloud-patient-management

Alternatively, download the repository and open its project folder in VS Code.

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the project root:

PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string

Replace the placeholder with your actual MongoDB Atlas connection string.

Security: Never commit your real .env file or publish your database password. The .env file should be excluded through .gitignore.

4. Start the Application

For development:

npm run dev

Or start the application normally:

npm start

5. Open the Application

Open the following address in your browser:

http://localhost:3000

The API health endpoint is available at:

http://localhost:3000/api

API Endpoints

The application exposes the following patient management endpoints:

Method

Endpoint

Description

GET

/api/patients

Retrieve all patients

GET

/api/patients/:id

Retrieve one patient

POST

/api/patients

Create a patient

PUT

/api/patients/:id

Update a patient

DELETE

/api/patients/:id

Delete a patient

GET

/api

Check API status
Patient records arePrerequisites

Patient records are stored in MongoDB Atlas and accessed through the Express API.

## Demo Video

Watch the demo here: https://youtu.be/XkFVrrKhgb8


Author

Preston Raphael Machanga Wekhanya

BYU–Idaho — CSE 310
Module 3: Cloud Databases