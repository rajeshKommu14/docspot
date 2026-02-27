import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");

  const bookAppointment = async () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      await API.post("/book", {
        doctor_id: parseInt(id),
        date: date,
      });

      alert("Appointment Booked Successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.log("Booking error:", err);
      alert("Booking failed. Please login again.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span style={styles.icon}>📅</span>
          <h2 style={styles.title}>Book Appointment</h2>
          <p style={styles.subtitle}>Select your preferred date for the consultation.</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Select Appointment Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={bookAppointment} style={styles.confirmBtn}>
          Confirm Booking
        </button>
        
        <button onClick={() => navigate(-1)} style={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70vh",
    backgroundColor: "#f4f7f9", // Soft background to make the card "pop"
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  header: {
    marginBottom: "30px",
  },
  icon: {
    fontSize: "40px",
    display: "block",
    marginBottom: "10px",
  },
  title: {
    margin: "0",
    fontSize: "24px",
    color: "#2c3e50",
    fontWeight: "700",
  },
  subtitle: {
    color: "#7f8c8d",
    fontSize: "14px",
    marginTop: "8px",
  },
  formGroup: {
    textAlign: "left",
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#546e7a",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #dcdfe6",
    fontSize: "16px",
    color: "#2c3e50",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  confirmBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "background 0.3s ease",
    marginBottom: "12px",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
  },
  cancelBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "transparent",
    color: "#95a5a6",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },
};

export default BookAppointment;