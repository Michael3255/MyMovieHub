import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

// A compact poster card used in the Dashboard horizontal scroll rows
export default function MovieCard({ userMovie, onDelete }) {
  return (
    <div className={styles.card}>

      {/* Delete button shown on hover */}
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(userMovie.id)}
        title="Remove from list"
      >
        ✕
      </button>

      {/* Clicking the poster navigates to MovieDetails */}
      <Link to={"/movie/" + userMovie.id} className={styles.posterLink}>
        {userMovie.movie.poster_url ? (
          <img
            src={userMovie.movie.poster_url}
            alt={userMovie.movie.title}
            className={styles.poster}
          />
        ) : (
          <div className={styles.posterPlaceholder}>
            <span className={styles.placeholderIcon}>🎬</span>
          </div>
        )}

        {/* Info overlay at the bottom of the poster */}
        <div className={styles.overlay}>
          <p className={styles.movieTitle}>{userMovie.movie.title}</p>
          {userMovie.movie.release_year && (
            <p className={styles.year}>{userMovie.movie.release_year}</p>
          )}
          {userMovie.rating && (
            <p className={styles.rating}>{"★".repeat(userMovie.rating)}</p>
          )}
        </div>
      </Link>

    </div>
  );
}
