import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import styles from "./Navbar.module.css";

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
    <nav className={styles.nav}>
      <Link to="/dashboard" className={styles.logo}>
        MY<span className={styles.logoAccent}>MOVIE</span>HUB
      </Link>

      <div className={styles.links}>
        {token ? (
          <>
            <Link to="/dashboard" className={styles.link}>My List</Link>
            <Link to="/add" className={styles.link}>Search</Link>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className={styles.link}>Login</Link>
            <Link to="/register" className={styles.registerButton}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}