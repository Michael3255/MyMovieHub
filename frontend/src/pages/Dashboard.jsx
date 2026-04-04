import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Dashboard() {
  const [userMovies, setUserMovies] = useState([]);
  const { token } = useContext(AuthContext);

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

  return (
    <div>
      <h1>My Movie List</h1>

      {userMovies.length === 0 ? (
        <p>You haven't added any movies yet.</p>
      ) : (
        <ul>
          {userMovies.map((userMovie) => (
            <li key={userMovie.id}>
              {userMovie.movie.title} — {userMovie.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}