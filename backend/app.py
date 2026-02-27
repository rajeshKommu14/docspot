from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from models import db, User, Doctor, Appointment
import config

app = Flask(__name__)
app.config.from_object(config)

db.init_app(app)
CORS(app)
jwt = JWTManager(app)

# ---------------- INITIALIZE DATABASE ----------------
with app.app_context():
    db.create_all()

    # Add default doctors only if none exist
    if Doctor.query.count() == 0:
        doctors = [
            Doctor(name="Dr. Smith", specialty="Cardiologist", location="Hyderabad"),
            Doctor(name="Dr. Priya", specialty="Dermatologist", location="Vijayawada"),
            Doctor(name="Dr. Kumar", specialty="Neurologist", location="Guntur")
        ]
        db.session.add_all(doctors)
        db.session.commit()
        print("Default doctors added successfully")


# ---------------- REGISTER ----------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    if not data.get("email") or not data.get("password") or not data.get("role"):
        return jsonify({"message": "All fields are required"}), 400

    # Check existing user
    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    new_user = User(
        email=data["email"],
        password=data["password"],
        role=data["role"]
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(
        email=data["email"],
        password=data["password"]
    ).first()

    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    # Convert ID to string (VERY IMPORTANT)
    token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": token,
        "role": user.role
    }), 200


# ---------------- GET DOCTORS ----------------
@app.route("/doctors", methods=["GET"])
def get_doctors():
    doctors = Doctor.query.all()

    doctor_list = []
    for doctor in doctors:
        doctor_list.append({
            "id": doctor.id,
            "name": doctor.name,
            "specialty": doctor.specialty,
            "location": doctor.location
        })

    return jsonify(doctor_list), 200


# ---------------- BOOK APPOINTMENT ----------------
@app.route("/book", methods=["POST"])
@jwt_required()
def book():
    user_id = int(get_jwt_identity())
    data = request.json

    if not data.get("doctor_id") or not data.get("date"):
        return jsonify({"message": "Doctor and date required"}), 400

    doctor = Doctor.query.get(data["doctor_id"])
    if not doctor:
        return jsonify({"message": "Doctor not found"}), 404

    new_appointment = Appointment(
        user_id=user_id,
        doctor_id=doctor.id,
        date=data["date"],
        status="Pending"
    )

    db.session.add(new_appointment)
    db.session.commit()

    return jsonify({"message": "Appointment booked successfully"}), 201


# ---------------- GET USER APPOINTMENTS ----------------
@app.route("/appointments", methods=["GET"])
@jwt_required()
def get_appointments():
    user_id = int(get_jwt_identity())

    appointments = Appointment.query.filter_by(user_id=user_id).all()

    result = []
    for appointment in appointments:
        doctor = Doctor.query.get(appointment.doctor_id)

        result.append({
            "doctor_name": doctor.name if doctor else "Unknown",
            "specialty": doctor.specialty if doctor else "",
            "location": doctor.location if doctor else "",
            "date": appointment.date,
            "status": appointment.status
        })

    return jsonify(result), 200


# ---------------- ROOT ROUTE ----------------
@app.route("/")
def home():
    return jsonify({"message": "DocSpot Backend Running"}), 200


# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)