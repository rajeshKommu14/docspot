DocSpot – Doctor Appointment Booking System
Overview

DocSpot is a full-stack web application that enables users to book medical appointments online. The platform allows users to register, log in securely, browse available doctors, and schedule appointments through a structured and user-friendly interface.

The application is built using React for the frontend and Flask for the backend, with JWT-based authentication and SQLite database integration.

Features
User Features

User registration

Secure login using JWT authentication

View available doctors

Book appointments

View appointment history

Logout functionality

Backend Features

RESTful API architecture

JWT-based authentication

Protected API routes

Automatic doctor data seeding

Input validation and error handling

Technology Stack
Frontend

React.js

Axios

React Router DOM

Backend

Flask

Flask-CORS

Flask-JWT-Extended

SQLAlchemy ORM

Database

SQLite

Version Control

Git

GitHub

System Architecture

The application follows a client-server architecture:

Frontend (React) → Backend (Flask) → SQLite Database

Authentication is handled using JSON Web Tokens (JWT), ensuring secure communication between client and server.

Project Structure
docspot/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── config.py
│   ├── requirements.txt
│   └── database.db
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api.js
    │   ├── App.js
    │   └── index.js
Installation and Setup
1. Clone the Repository
git clone https://github.com/rajeshKommu14/docspot.git
cd docspot
2. Backend Setup

Navigate to backend folder:

cd backend

Create virtual environment:

python -m venv venv
venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run backend server:

python app.py

Backend runs on:

http://127.0.0.1:5000
3. Frontend Setup

Open a new terminal and navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start React development server:

npm start

Frontend runs on:

http://localhost:3000
API Endpoints
Method	Endpoint	Description
POST	/register	Register new user
POST	/login	Authenticate user
GET	/doctors	Retrieve list of doctors
POST	/book	Book appointment
GET	/appointments	Retrieve user appointments
Authentication Flow

User logs in with valid credentials.

Server generates a JWT token.

Token is stored in the browser.

Token is sent in the Authorization header for protected routes.

Backend validates the token before granting access.

Security Implementation

JWT-based authentication

Protected backend routes

Strong secret key configuration

CORS enabled for secure frontend-backend communication

Future Enhancements

Doctor approval system

Admin dashboard

Appointment approval and rejection

Password hashing

File upload support for medical records

Cloud deployment

Author

Rajesh Kommu
GitHub: https://github.com/rajeshKommu14
