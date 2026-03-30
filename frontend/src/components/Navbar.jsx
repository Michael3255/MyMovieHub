import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MyMovieHub</h2>
      <div>
        <Link style={styles.link} to="/">Login</Link>
        <Link style={styles.link} to="/register">Register</Link>
        <Link style={styles.link} to="/dashboard">Dashboard</Link>
        <Link style={styles.link} to="/add">Add Movie</Link>
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
};