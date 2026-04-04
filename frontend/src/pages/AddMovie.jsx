import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function AddMovie() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);

  async function handleSearch(e) {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/movies/search/?query=" + query,
      {
        headers: {
          Authorization: "Token " + token,
        },
      }
    );

    const data = await response.json();
    setResults(data.results);
  }

  async function handleAdd(movie) {
    const saveResponse = await fetch("http://127.0.0.1:8000/movies/save/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        release_year: movie.release_year,
        description: movie.description,
        poster_url: movie.poster_url,
        genres: movie.genres,
      }),
    });

    const savedMovie = await saveResponse.json();

    // testing
    console.log('savedMovie:', savedMovie);

    const addResponse = await fetch("http://127.0.0.1:8000/user-movies/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({
        movie_id: savedMovie.id,
        status: "want_to_watch",
      }),
    });

    const data = await addResponse.json();

    // testing
    console.log('addResponse data:', data);

    if (data.id) {
      setMessage(movie.title + " added to your list!");
    } else {
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div>
      <h1>Search Movies</h1>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {results.map((movie) => (
          <div key={movie.tmdb_id} style={styles.card}>
            {movie.poster_url && (
              <img
                src={movie.poster_url}
                alt={movie.title}
                style={styles.poster}
              />
            )}
            <div>
              <h3>{movie.title}</h3>
              <p>{movie.release_year}</p>
              <p>{movie.description}</p>
              <button onClick={() => handleAdd(movie)}>Add to My List</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
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
};