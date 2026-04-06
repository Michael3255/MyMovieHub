import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await fetch("http://127.0.0.1:8000/auth/logout/", {
      method: "POST",
      headers: {
        Authorization: "Token " + token,
      },
    });

    if (response.ok) {
      logout();
      navigate("/");
    }
  }

  return (
    <nav style={styles.nav}>
      <Link to="/dashboard" style={styles.logo}>
        MY<span style={styles.logoAccent}>MOVIE</span>HUB
      </Link>

      <div style={styles.links}>
        {token ? (
          <>
            <Link to="/dashboard" style={styles.link}>My List</Link>
            <Link to="/add" style={styles.link}>Search</Link>
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerButton}>Register</Link>
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
    padding: "0 40px",
    height: "68px",
    background: "rgba(5, 5, 26, 0.85)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(123, 47, 255, 0.3)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 4px 30px rgba(123, 47, 255, 0.15)",
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.8rem",
    letterSpacing: "4px",
    color: "#ffffff",
    textDecoration: "none",
  },
  logoAccent: {
    color: "#7b2fff",
    textShadow: "0 0 20px rgba(123, 47, 255, 0.8)",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  link: {
    color: "#a0a8cc",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    letterSpacing: "0.5px",
    transition: "color 0.3s ease",
  },
  logoutButton: {
    background: "transparent",
    border: "1px solid #7b2fff",
    color: "#7b2fff",
    padding: "8px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "1px",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(123, 47, 255, 0.3)",
  },
  registerButton: {
    background: "linear-gradient(135deg, #7b2fff, #ff2d7a)",
    color: "white",
    padding: "8px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "1px",
    textDecoration: "none",
    boxShadow: "0 0 15px rgba(123, 47, 255, 0.4)",
  },
};