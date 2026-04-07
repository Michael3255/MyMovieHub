import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import RatingStars from "../components/RatingStars";
import styles from "./MovieDetails.module.css";

export default function MovieDetails() {
  const [userMovie, setUserMovie] = useState(null);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);
  const [notesSaved, setNotesSaved] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch movie details and trailer when the page loads
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  async function fetchMovieDetails() {
    const response = await fetch("http://127.0.0.1:8000/user-movies/" + id + "/", {
      headers: { Authorization: "Token " + token },
    });
    const data = await response.json();
    setUserMovie(data);
    setStatus(data.status);
    setRating(data.rating || 0);
    setNotes(data.notes || "");

    // Fetch the trailer using the movie's TMDB id
    if (data.movie.tmdb_id) {
      fetchTrailer(data.movie.tmdb_id);
    }
  }

  async function fetchTrailer(tmdbId) {
    const response = await fetch("http://127.0.0.1:8000/movies/" + tmdbId + "/trailer/", {
      headers: { Authorization: "Token " + token },
    });
    const data = await response.json();
    setTrailerKey(data.youtube_key);
  }

  // Saves updated status and rating to the backend
  async function handleUpdateStatus(newStatus) {
    setStatus(newStatus);
    await fetch("http://127.0.0.1:8000/user-movies/" + id + "/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ status: newStatus, rating: rating, notes: notes }),
    });
  }

  // Saves updated rating to the backend
  async function handleUpdateRating(newRating) {
    setRating(newRating);
    await fetch("http://127.0.0.1:8000/user-movies/" + id + "/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ status: status, rating: newRating, notes: notes }),
    });
  }

  // Saves the notes text to the backend
  async function handleSaveNotes() {
    await fetch("http://127.0.0.1:8000/user-movies/" + id + "/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ status: status, rating: rating, notes: notes }),
    });

    // Makes "Notes saved!" message delete after a couple seconds
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  }

  if (!userMovie) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }

  // Map status value to a display label and badge style
  const statusLabels = {
    watching: "Watching",
    want_to_watch: "Want to Watch",
    watched: "Watched",
  };

  const statusBadgeClass = {
    watching: styles.badgeWatching,
    want_to_watch: styles.badgeWant,
    watched: styles.badgeWatched,
  };

  return (
    <div className={styles.page}>

      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>

        {/* Back button */}
        <button className={styles.backButton} onClick={() => navigate("/dashboard")}>
          ← Back to My List
        </button>

        {/* Hero section: poster + movie info side by side */}
        <div className={styles.hero}>

          {/* Poster */}
          <div className={styles.posterWrapper}>
            {userMovie.movie.poster_url ? (
              <img
                src={userMovie.movie.poster_url}
                alt={userMovie.movie.title}
                className={styles.poster}
              />
            ) : (
              <div className={styles.posterPlaceholder}>
                <span>🎬</span>
              </div>
            )}
          </div>

          {/* Movie info */}
          <div className={styles.info}>

            <h1 className={styles.movieTitle}>{userMovie.movie.title}</h1>

            {userMovie.movie.release_year && (
              <span className={styles.year}>{userMovie.movie.release_year}</span>
            )}

            {userMovie.movie.description && (
              <p className={styles.description}>{userMovie.movie.description}</p>
            )}

            <div className={styles.divider} />

            {/* Status selector */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Status</label>
              <div className={styles.statusButtons}>
                {["watching", "want_to_watch", "watched"].map((s) => (
                  <button
                    key={s}
                    className={status === s ? styles.statusButtonActive : styles.statusButton}
                    onClick={() => handleUpdateStatus(s)}
                  >
                    {statusLabels[s]}
                  </button>
                ))}
              </div>
            </div>

            {/* Star rating */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Your Rating</label>
              <RatingStars rating={rating} onRate={handleUpdateRating} editable={true} />
              {rating > 0 && (
                <span className={styles.ratingText}>{rating} / 5</span>
              )}
            </div>

          </div>
        </div>

        {/* Trailer embed */}
        {trailerKey && (
          <div className={styles.trailerSection}>
            <h2 className={styles.sectionTitle}>Trailer</h2>
            <div className={styles.trailerWrapper}>
              <iframe
                className={styles.trailer}
                src={"https://www.youtube.com/embed/" + trailerKey}
                title={userMovie.movie.title + " Trailer"}
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Notes section */}
        <div className={styles.notesSection}>
          <h2 className={styles.sectionTitle}>My Notes</h2>
          <textarea
            className={styles.textarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your thoughts about this movie..."
            rows={5}
          />
          <div className={styles.notesFooter}>
            <button className={styles.saveButton} onClick={handleSaveNotes}>
              Save Notes
            </button>
            {notesSaved && (
              <span className={styles.savedMessage}>Notes saved!</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
