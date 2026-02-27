function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <div style={styles.logo}>Doc<span style={styles.logoAccent}>Spot</span></div>
          <p style={styles.description}>
            Providing world-class healthcare connectivity at your fingertips. 
            Trusted by over 500+ certified medical professionals.
          </p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Support</h4>
          <ul style={styles.list}>
            <li>Help Center</li>
            <li>Contact Support</li>
            <li>Emergency: 911</li>
          </ul>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p style={styles.copyright}>© 2026 DocSpot. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "80px",
    padding: "60px 40px 20px 40px",
    backgroundColor: "#f8f9fa", // Ultra-light medical gray
    borderTop: "1px solid #e0e0e0",
    color: "#455a64",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2c3e50",
  },
  logoAccent: {
    color: "#007bff",
  },
  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#78909c",
    maxWidth: "300px",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "5px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    cursor: "pointer",
  },
  bottomBar: {
    marginTop: "60px",
    paddingTop: "20px",
    borderTop: "1px solid #eceff1",
    textAlign: "center",
  },
  copyright: {
    fontSize: "13px",
    color: "#b0bec5",
  },
};

export default Footer;