import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <span style={styles.logoIcon}>✚</span>
        <div style={styles.logoText}>Doc<span style={styles.logoAccent}>Spot</span></div>
      </div>

      <div style={styles.links}>
        {token ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 60px",
    height: "80px",
    background: "#ffffff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    borderBottom: "3px solid #007bff", // Medical blue accent line
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  logoIcon: {
    fontSize: "24px",
    color: "#007bff",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2c3e50", // Deep professional slate
    letterSpacing: "-0.5px",
  },
  logoAccent: {
    color: "#007bff",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  link: {
    color: "#546e7a",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    transition: "color 0.3s ease",
  },
  registerBtn: {
    background: "#007bff",
    color: "white",
    textDecoration: "none",
    padding: "10px 24px",
    borderRadius: "50px", // Pill shape is very modern/premium
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 4px 6px rgba(0, 123, 255, 0.2)",
  },
  logoutBtn: {
    background: "transparent",
    color: "#e74c3c", // Subtle red for logout
    border: "1px solid #e74c3c",
    padding: "8px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};

export default Header;