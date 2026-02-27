import { useEffect, useState } from "react";
import API from "../api";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8f9fa", // Soft light gray
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      color: "#2c3e50",
    },
    wrapper: {
      maxWidth: "1000px",
      margin: "0 auto",
    },
    header: {
      backgroundColor: "#ffffff",
      padding: "30px",
      borderRadius: "16px 16px 0 0",
      borderBottom: "1px solid #edf2f7",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "700",
      margin: 0,
      color: "#1a365d", // Deep medical blue
    },
    statsBadge: {
      backgroundColor: "#ebf8ff",
      color: "#3182ce",
      padding: "6px 16px",
      borderRadius: "50px",
      fontSize: "13px",
      fontWeight: "600",
    },
    appointmentList: {
      backgroundColor: "#ffffff",
      borderRadius: "0 0 16px 16px",
      padding: "20px",
      boxShadow: "0 10px 15px rgba(0,0,0,0.05)",
    },
    appointmentRow: {
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #f0f4f8",
      padding: "20px 15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.2s ease",
    },
    patientSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    avatarPlaceholder: {
      width: "40px",
      height: "40px",
      backgroundColor: "#edf2f7",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#718096",
      fontWeight: "bold",
    },
    dateContainer: {
      display: "flex",
      flexDirection: "column",
    },
    dateLabel: {
      fontSize: "11px",
      color: "#a0aec0",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      fontWeight: "700",
    },
    dateValue: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#2d3748",
    },
    statusBadge: (status) => {
      const isConfirmed = status === "confirmed";
      return {
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "700",
        textTransform: "uppercase",
        backgroundColor: isConfirmed ? "#c6f6d5" : "#feebc8",
        color: isConfirmed ? "#22543d" : "#744210",
      };
    },
    emptyState: {
      textAlign: "center",
      padding: "80px 0",
      color: "#a0aec0",
      backgroundColor: "white",
      borderRadius: "16px",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <div>
            <h2 style={styles.title}>Physician Portal</h2>
            <p style={{ margin: "5px 0 0", color: "#718096", fontSize: "14px" }}>
              Manage your daily schedule and patient intake.
            </p>
          </div>
          <span style={styles.statsBadge}>
            {appointments.length} Appointments
          </span>
        </header>

        {appointments.length > 0 ? (
          <div style={styles.appointmentList}>
            {appointments.map((a, index) => (
              <div 
                key={index} 
                style={styles.appointmentRow}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f7fafc")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              >
                <div style={styles.patientSection}>
                  <div style={styles.avatarPlaceholder}>P</div>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "16px" }}>Patient ID: #{a.user_id || "N/A"}</div>
                    <div style={{ fontSize: "13px", color: "#718096" }}>General Consultation</div>
                  </div>
                </div>

                <div style={styles.dateContainer}>
                  <span style={styles.dateLabel}>Appointment Time</span>
                  <span style={styles.dateValue}>{a.date}</span>
                </div>

                <div style={styles.statusBadge(a.status?.toLowerCase())}>
                  {a.status || "Pending"}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>📅</div>
            <p>Your schedule is currently clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;