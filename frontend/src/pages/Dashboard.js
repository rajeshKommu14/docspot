import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log("Error fetching doctors:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.log("Error fetching appointments:", err);
    }
  };

  return (
    <div style={styles.dashboardWrapper}>
      {/* Background Overlay to keep cards readable */}
      <div style={styles.backgroundOverlay}></div>

      <div style={styles.contentContainer}>
        <header style={styles.headerSection}>
          <h2 style={styles.mainTitle}>Medical Dashboard</h2>
          <p style={styles.subtitle}>Manage your health and schedule new consultations.</p>
        </header>

        {/* SECTION: DOCTOR LIST */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Available Specialists</h3>
          <div style={styles.cardContainer}>
            {doctors.map((doc) => (
              <div key={doc.id} style={styles.doctorCard}>
                <div style={styles.avatarPlaceholder}>{doc.name.charAt(0)}</div>
                <h4 style={styles.docName}>{doc.name}</h4>
                <span style={styles.specialtyBadge}>{doc.specialty}</span>
                <p style={styles.locationText}>📍 {doc.location}</p>

                <Link to={`/book/${doc.id}`} style={{ textDecoration: 'none' }}>
                  <button style={styles.bookBtn}>Schedule Visit</button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <div style={styles.divider}></div>

        {/* SECTION: APPOINTMENTS */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Upcoming Appointments</h3>
          {appointments.length === 0 ? (
            <div style={styles.emptyState}>
              <p>You have no scheduled appointments at this time.</p>
            </div>
          ) : (
            <div style={styles.appointmentList}>
              {appointments.map((a, index) => (
                <div key={index} style={styles.appointmentRow}>
                  <div style={styles.appointmentInfo}>
                    <div style={styles.appDocName}>{a.doctor_name}</div>
                    <div style={styles.appSpecialty}>{a.specialty}</div>
                  </div>
                  <div style={styles.appointmentDetails}>
                    <div style={styles.dateLabel}>DATE</div>
                    <div style={styles.dateValue}>{a.date}</div>
                  </div>
                  <div style={styles.statusSection}>
                    <span style={styles.statusBadge(a.status)}>{a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

const styles = {
  dashboardWrapper: {
    position: "relative",
    padding: "40px 60px",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    // Premium light medical background (architectural/abstract)
    backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed", // Keeps background still while scrolling
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(252, 253, 254, 0.92)", // Whitens the image significantly
    zIndex: 1,
  },
  contentContainer: {
    position: "relative",
    zIndex: 2, // Lifts content above the overlay
    maxWidth: "1200px",
    margin: "0 auto",
  },
  headerSection: {
    marginBottom: "40px",
  },
  mainTitle: {
    fontSize: "28px",
    color: "#2c3e50",
    margin: 0,
    fontWeight: "700",
  },
  subtitle: {
    color: "#7f8c8d",
    fontSize: "16px",
    marginTop: "5px",
  },
  section: {
    marginBottom: "50px",
  },
  sectionTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#546e7a",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
  },
  doctorCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", 
    backdropFilter: "blur(8px)", // Frosted glass effect
    padding: "30px 20px",
    borderRadius: "20px",
    textAlign: "center",
    border: "1px solid rgba(237, 242, 247, 0.8)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
  },
  avatarPlaceholder: {
    width: "64px",
    height: "64px",
    backgroundColor: "#e3f2fd",
    color: "#007bff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 auto 15px",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
  },
  docName: {
    margin: "0 0 5px 0",
    color: "#2c3e50",
    fontSize: "18px",
    fontWeight: "600",
  },
  specialtyBadge: {
    display: "inline-block",
    backgroundColor: "#f0f4f8",
    color: "#007bff",
    padding: "4px 14px",
    borderRadius: "50px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  locationText: {
    fontSize: "14px",
    color: "#95a5a6",
    margin: "0 0 20px 0",
  },
  bookBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 4px 6px rgba(0, 123, 255, 0.2)",
    transition: "background 0.2s ease",
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(203, 213, 224, 0.5)",
    margin: "40px 0",
  },
  appointmentList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  appointmentRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 30px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    borderRadius: "16px",
    border: "1px solid rgba(237, 242, 247, 0.8)",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
  },
  appDocName: {
    fontWeight: "600",
    color: "#2c3e50",
    fontSize: "16px",
  },
  appSpecialty: {
    fontSize: "13px",
    color: "#7f8c8d",
  },
  dateLabel: {
    fontSize: "10px",
    color: "#bdc3c7",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },
  dateValue: {
    fontSize: "14px",
    color: "#2c3e50",
    fontWeight: "600",
  },
  statusBadge: (status) => ({
    padding: "6px 16px",
    borderRadius: "50px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    backgroundColor: status === "confirmed" ? "#e6fffa" : "#fff5f5",
    color: status === "confirmed" ? "#319795" : "#e53e3e",
    border: status === "confirmed" ? "1px solid #b2f5ea" : "1px solid #feb2b2",
  }),
  emptyState: {
    padding: "60px",
    textAlign: "center",
    backgroundColor: "rgba(248, 250, 252, 0.6)",
    borderRadius: "20px",
    border: "2px dashed #cbd5e0",
    color: "#94a3b8",
  }
};

export default Dashboard;