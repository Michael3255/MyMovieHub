import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Dashboard() {
  const [userMovies, setUserMovies] = useState([]);
  const { token } = useContext(AuthContext);

  // When the page loads it fetches the user's movies.
  useEffect(() => {
    fetchUserMovies();
  }, []);

  async function fetchUserMovies() {
    const response = await fetch("http://127.0.0.1:8000/user-movies/", {
      headers: {
        "Authorization": "Token " + token,
      },
    });

    const data = await response.json();
    setUserMovies(data);
  }

  // Sends updated status and rating to the backend, then refreshes the list
  async function handleUpdate(id, newStatus, newRating) {
    await fetch("http://127.0.0.1:8000/user-movies/" + id + "/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({
        status: newStatus,
        rating: newRating,
      }),
    });

    fetchUserMovies();
  }

  // Deletes a movie from the user's list, then refreshes the list
  async function handleDelete(id) {
    await fetch("http://127.0.0.1:8000/user-movies/" + id + "/delete/", {
      method: "DELETE",
      headers: {
        Authorization: "Token " + token,
      },
    });

    fetchUserMovies();
  }


  return (
    <div>
      <h1>My Movie List</h1>

      {userMovies.length === 0 ? (
        <p>You haven't added any movies yet.</p>
      ) : (
        <ul style={styles.list}>
          {userMovies.map((userMovie) => (
            <li key={userMovie.id} style={styles.card}>

              {userMovie.movie.poster_url && (
                <img
                  src={userMovie.movie.poster_url}
                  alt={userMovie.movie.title}
                  style={styles.poster}
                />
              )}

              <div style={styles.info}>
                <h3>{userMovie.movie.title}</h3>
                <p>{userMovie.movie.release_year}</p>

                {/* Status dropdown */}
                <select
                  value={userMovie.status}
                  onChange={(e) =>
                    handleUpdate(userMovie.id, e.target.value, userMovie.rating)
                  }
                >
                  <option value="want_to_watch">Want to Watch</option>
                  <option value="watching">Watching</option>
                  <option value="watched">Watched</option>
                </select>

                {/* Rating dropdown */}
                <select
                  value={userMovie.rating || ""}
                  onChange={(e) =>
                    handleUpdate(userMovie.id, userMovie.status, e.target.value)
                  }
                >
                  <option value="">No Rating</option>
                  <option value="1">1 star</option>
                  <option value="2">2 stars</option>
                  <option value="3">3 stars</option>
                  <option value="4">4 stars</option>
                  <option value="5">5 stars</option>
                </select>

                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(userMovie.id)}
                >
                  Remove
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
  },
  card: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "20px",
  },
  poster: {
    width: "100px",
    height: "150px",
    objectFit: "cover",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  deleteButton: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    width: "fit-content",
  },
};