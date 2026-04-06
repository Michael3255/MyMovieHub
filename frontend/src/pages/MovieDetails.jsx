import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function MovieDetails() {
  const [userMovie, setUserMovie] = useState(null);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetches the specific userMovie record when the page loads
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  async function fetchMovieDetails() {
    const response = await fetch("http://127.0.0.1:8000/user-movies/" + id + "/", {
      headers: {
        Authorization: "Token " + token,
      },
    });

    const data = await response.json();
    setUserMovie(data);
    setNotes(data.notes || "");
  }

  // Saves the updated notes to the backend
  async function handleSaveNotes() {
    await fetch("http://127.0.0.1:8000/user-movies/" + id + "/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({
        status: userMovie.status,
        rating: userMovie.rating,
        notes: notes,
      }),
    });

    setMessage("Notes saved!");
  }

  // Shows a loading message while the data is being fetched
  if (!userMovie) {
    return <p>Loading...</p>;
  }

  return (
    <div style={styles.container}>

      <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <div style={styles.top}>
        {userMovie.movie.poster_url && (
          <img
            src={userMovie.movie.poster_url}
            alt={userMovie.movie.title}
            style={styles.poster}
          />
        )}

        <div style={styles.info}>
          <h1>{userMovie.movie.title}</h1>
          <p>{userMovie.movie.release_year}</p>
          <p>{userMovie.movie.description}</p>
          <p>Status: {userMovie.status}</p>
          <p>Rating: {userMovie.rating ? userMovie.rating + " stars" : "No rating yet"}</p>
        </div>
      </div>

      <div style={styles.notesSection}>
        <h2>My Notes</h2>
        <textarea
          style={styles.textarea}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes about this movie..."
          rows={5}
        />
        <button style={styles.saveButton} onClick={handleSaveNotes}>
          Save Notes
        </button>
        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  backButton: {
    marginBottom: "20px",
    padding: "8px 16px",
    cursor: "pointer",
  },
  top: {
    display: "flex",
    gap: "30px",
    marginBottom: "30px",
  },
  poster: {
    width: "200px",
    height: "300px",
    objectFit: "cover",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  notesSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  saveButton: {
    background: "green",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
    width: "fit-content",
  },
};