import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import MovieCard from "../components/MovieCard";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [userMovies, setUserMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [recsMessage, setRecsMessage] = useState("");
  const [recsLoading, setRecsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  // Fetches the user's full movie list when the page loads
  useEffect(() => {
    fetchUserMovies();
  }, []);

  async function fetchUserMovies() {
    const response = await fetch("http://127.0.0.1:8000/user-movies/", {
      headers: { Authorization: "Token " + token },
    });
    const data = await response.json();
    setUserMovies(data);
  }

  // Removes a movie from the user's list and refreshes
  async function handleDelete(id) {
    await fetch("http://127.0.0.1:8000/user-movies/" + id + "/delete/", {
      method: "DELETE",
      headers: { Authorization: "Token " + token },
    });
    fetchUserMovies();
  }

  // Fetches TasteDive API recommendations based on the user's top rated movie
  async function fetchRecommendations() {
    setRecsLoading(true);
    setRecommendations([]);
    setRecsMessage("");

    // Possibly add a shuffle recommendations update?

    const response = await fetch("http://127.0.0.1:8000/movies/recommendations/", {
      headers: { Authorization: "Token " + token },
    });
    const data = await response.json();

    if (data.error) {
      setRecsMessage(data.error);
    } else {
      setRecsMessage("Based on your love of " + data.based_on);
      setRecommendations(data.recommendations);
    }
    setRecsLoading(false);
  }

  // Groups movies by the users selected watch status
  const watching = userMovies.filter((m) => m.status === "watching");
  const wantToWatch = userMovies.filter((m) => m.status === "want_to_watch");
  const watched = userMovies.filter((m) => m.status === "watched");

  return (
    <div className={styles.page}>

      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>

        {/* Page header */}
        <div className={styles.header}>
          <h1 className={styles.title}>My List</h1>
          <Link to="/add" className={styles.addButton}>+ Add Movies</Link>
        </div>

        {/* Empty state when the user has no movies at all */}
        {userMovies.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>🎬</p>
            <p className={styles.emptyText}>Your list is empty</p>
            <Link to="/add" className={styles.emptyLink}>Search for movies to get started</Link>
          </div>
        )}

        {/* WATCHING row */}
        {watching.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Watching</h2>
              <span className={styles.sectionCount}>{watching.length}</span>
            </div>
            <div className={styles.row}>
              {watching.map((userMovie) => (
                <MovieCard
                  key={userMovie.id}
                  userMovie={userMovie}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}

        {/* WANT TO WATCH row */}
        {wantToWatch.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Want to Watch</h2>
              <span className={styles.sectionCount}>{wantToWatch.length}</span>
            </div>
            <div className={styles.row}>
              {wantToWatch.map((userMovie) => (
                <MovieCard
                  key={userMovie.id}
                  userMovie={userMovie}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}

        {/* WATCHED row */}
        {watched.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Watched</h2>
              <span className={styles.sectionCount}>{watched.length}</span>
            </div>
            <div className={styles.row}>
              {watched.map((userMovie) => (
                <MovieCard
                  key={userMovie.id}
                  userMovie={userMovie}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recommendations section */}
        {userMovies.length > 0 && (
          <section className={styles.recsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recommendations</h2>
              <button
                className={recsLoading ? styles.recsButtonLoading : styles.recsButton}
                onClick={fetchRecommendations}
                disabled={recsLoading}
              >
                {recsLoading ? "Loading..." : "Get Recommendations"}
              </button>
            </div>

            {recsMessage && (
              <p className={styles.recsMessage}>{recsMessage}</p>
            )}

            {recommendations.length > 0 && (
              <div className={styles.recsList}>
                {recommendations.map((rec, index) => (
                  <div key={index} className={styles.recItem}>
                    <span className={styles.recIcon}>🎬</span>
                    <span className={styles.recTitle}>{rec.title}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
}
