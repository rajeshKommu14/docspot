import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Overlay for the fade effect */}
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <div style={styles.brand}>
          <span style={styles.logoIcon}>✚</span>
          <h2 style={styles.title}>Doc<span style={styles.logoAccent}>Spot</span></h2>
        </div>
        
        <p style={styles.subtitle}>Secure Patient & Staff Portal</p>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input 
            placeholder="e.g. name@hospital.com" 
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button 
          style={styles.button} 
          onClick={login}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Sign In to Portal
        </button>

        <div style={styles.footerLink}>
          HIPAA Compliant & Secure Encryption
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative", // Needed for the overlay
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    // Premium medical background image
    backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // This creates the "fade" look - blue-ish white to transparent
    background: "linear-gradient(135deg, rgba(244, 247, 249, 0.9) 0%, rgba(244, 247, 249, 0.4) 100%)",
    zIndex: 1,
  },
  card: {
    position: "relative", // Ensures card stays above overlay
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Slight transparency for premium feel
    backdropFilter: "blur(10px)", // Modern "glassmorphism" effect
    padding: "50px 40px",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  logoIcon: {
    fontSize: "24px",
    color: "#007bff",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: 0,
    letterSpacing: "-1px",
  },
  logoAccent: {
    color: "#007bff",
  },
  subtitle: {
    fontSize: "15px",
    color: "#7f8c8d",
    marginBottom: "40px",
  },
  inputGroup: {
    marginBottom: "25px",
    textAlign: "left",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "700",
    color: "#546e7a",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    color: "#2c3e50",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)",
  },
  footerLink: {
    marginTop: "30px",
    fontSize: "12px",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
};

export default Login;