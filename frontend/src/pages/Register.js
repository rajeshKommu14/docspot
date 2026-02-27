import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      await API.post("/register", { email, password, role });
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>✚</div>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join our professional healthcare network</p>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Professional Email</label>
          <input
            placeholder="name@hospital.com"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Secure Password</label>
          <input
            type="password"
            placeholder="••••••••"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Account Role</label>
          <div style={{ position: "relative" }}>
            <select 
              style={styles.select} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Patient / Client</option>
              <option value="doctor">Medical Professional</option>
            </select>
            <div style={styles.selectArrow}>▾</div>
          </div>
        </div>

        <button 
          style={styles.button} 
          onClick={registerUser}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Create Account
        </button>

        <p style={styles.footerText}>
          By registering, you agree to our <strong>Clinical Terms of Service</strong>.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f7f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.05)",
    border: "1px solid #eef2f6",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  iconCircle: {
    width: "50px",
    height: "50px",
    backgroundColor: "#e3f2fd",
    color: "#007bff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    margin: "0 auto 15px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0 0 5px 0",
  },
  subtitle: {
    fontSize: "14px",
    color: "#7f8c8d",
    margin: 0,
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    color: "#546e7a",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#fcfdfe",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    color: "#2c3e50",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#fcfdfe",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    color: "#2c3e50",
    fontSize: "16px",
    outline: "none",
    cursor: "pointer",
    appearance: "none",
    boxSizing: "border-box",
  },
  selectArrow: {
    position: "absolute", 
    right: "15px", 
    top: "50%", 
    transform: "translateY(-50%)", 
    pointerEvents: "none", 
    color: "#007bff",
    fontSize: "18px"
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.2s ease",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)",
  },
  footerText: {
    marginTop: "25px",
    fontSize: "12px",
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: "1.5"
  }
};

export default Register;