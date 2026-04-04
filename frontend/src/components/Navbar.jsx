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
        "Authorization": "Token " + token,
      },
    });

    if (response.ok) {
      logout();
      navigate("/");
    }
  }

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MyMovieHub</h2>
      <div>
        {token ? (
          <>
            <Link style={styles.link} to="/dashboard">Dashboard</Link>
            <Link style={styles.link} to="/add">Add Movie</Link>
            <button style={styles.button} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
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
    padding: "15px 30px",
    background: "#222",
    color: "#fff",
    alignItems: "center",
  },
  logo: { margin: 0 },
  link: {
    color: "#fff",
    marginLeft: "15px",
    textDecoration: "none",
    fontSize: "16px",
  },
    button: {
    marginLeft: "15px",
    background: "none",
    border: "1px solid #fff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    padding: "4px 10px",
    borderRadius: "4px",
  },
};