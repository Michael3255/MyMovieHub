import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import styles from "./AddMovie.module.css";

export default function AddMovie() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addedIds, setAddedIds] = useState(new Set());
  const [loadingId, setLoadingId] = useState(null);
  const { token } = useContext(AuthContext);

  // Searches TMDB for movies matching the query
  async function handleSearch(e) {
    e.preventDefault();  // Prevents the browser from reloading the page when you submit a form
    if (!query.trim()) return;  // If theres nothing in the search bar the function wont run

    setSearching(true);
    setResults([]);

    const response = await fetch(
      "http://127.0.0.1:8000/movies/search/?query=" + query,
      {
        headers: {
          Authorization: "Token " + token,
        },
      }
    );

    const data = await response.json();

    // Sort results by release year, newest first
    const sorted = data.results.sort((a, b) => {
      const yearA = parseInt(a.release_year) || 0;
      const yearB = parseInt(b.release_year) || 0;
      return yearB - yearA;
    });

    setResults(sorted);
    setSearching(false);
  }

  // Saves the movie to the database then adds it to the user's list
  async function handleAdd(movie) {
    setLoadingId(movie.tmdb_id);

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

    await fetch("http://127.0.0.1:8000/user-movies/add/", {
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

    // Mark this movie as added so the button updates
    setAddedIds((prev) => new Set(prev).add(movie.tmdb_id));
    setLoadingId(null);
  }

  return (
    <div className={styles.page}>

      {/* Background orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.container}>

        {/* Page header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Discover Movies</h1>
          <p className={styles.subtitle}>Search the universe for your next watch</p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={searching ? styles.searchButtonLoading : styles.searchButton}
            disabled={searching}
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Empty state before first search */}
        {!searching && results.length === 0 && query === "" && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>Search for a movie above to get started</p>
          </div>
        )}

        {/* No results found */}
        {!searching && results.length === 0 && query !== "" && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No results found for "{query}"</p>
          </div>
        )}

        {/* Search results grid */}
        {results.length > 0 && (
          <div className={styles.results}>
            <p className={styles.resultsCount}>{results.length} results found</p>

            <div className={styles.grid}>
              {results.map((movie) => (
                <div key={movie.tmdb_id} className={styles.card}>

                  {/* Movie poster */}
                  {movie.poster_url ? (
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      className={styles.poster}
                    />
                  ) : (
                    <div className={styles.posterPlaceholder}>
                      <span className={styles.posterPlaceholderIcon}>🎬</span>
                    </div>
                  )}

                  {/* Movie info */}
                  <div className={styles.info}>
                    <h3 className={styles.movieTitle}>{movie.title}</h3>

                    {movie.release_year && (
                      <span className={styles.year}>{movie.release_year}</span>
                    )}

                    {movie.description && (
                      <p className={styles.description}>{movie.description}</p>
                    )}

                    {/* Add button */}
                    {addedIds.has(movie.tmdb_id) ? (
                      <button className={styles.buttonAdded} disabled>
                        Added to List
                      </button>
                    ) : (
                      <button
                        className={loadingId === movie.tmdb_id ? styles.buttonLoading : styles.button}
                        onClick={() => handleAdd(movie)}
                        disabled={loadingId === movie.tmdb_id}
                      >
                        {loadingId === movie.tmdb_id ? "Adding..." : "+ Add to My List"}
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
