# MyMovieHub 🎬

A full-stack movie tracking and recommendation web application. Users can search for movies, track what they're watching, rate and review them, and get personalized recommendations — all wrapped in a cinematic galaxy-themed interface.

---

## Purpose

The goal of this project was to build a complete full-stack application from scratch, connecting a Django REST API backend to a React frontend, integrating third-party APIs, and deploying with a professional development workflow.

---

## Features

- **Authentication** — Register, login, and logout with token-based authentication
- **Movie Search** — Search millions of movies powered by the TMDB API
- **Personal Movie List** — Track movies by status: Watching, Want to Watch, or Watched
- **Ratings and Notes** — Rate movies 1-5 stars and add personal notes
- **Movie Details** — View full movie info including an embedded YouTube trailer
- **Recommendations** — Get personalized movie suggestions powered by the TasteDive API
- **Galaxy UI** — Cinematic dark purple and blue theme with animations and glowing effects


## Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| React (Vite) | Frontend framework |
| React Router | Page navigation |
| Context API | Global authentication state |
| CSS Modules | Component level styling |
| Fetch API | HTTP requests to the backend |

### Backend
| Technology | Purpose |
|---|---|
| Django REST Framework | REST API |
| SQLite | Development database |
| Token Authentication | User authentication |
| python-dotenv | Environment variable management |

### External APIs
| API | Purpose |
|---|---|
| [TMDB API](https://www.themoviedb.org/documentation/api) | Movie search, details, and trailers |
| [TasteDive API](https://tastedive.com/read/api) | Movie recommendations |

---

---

## Entity Relationship Diagram
User (Django built-in)          Movie
─────────────────────           ──────────────────────
id (PK)                         id (PK)
username                        tmdb_id
email                           title
password                        release_year
genres
poster_url
description
            UserMovie
            ──────────────────────
            id (PK)
            user_id (FK → User)
            movie_id (FK → Movie)
            status
            rating
            notes
            created_at
            updated_at

### Relationships
- A **User** can have many **UserMovies**
- A **Movie** can belong to many **UserMovies**
- **UserMovie** is the join table that connects a User to a Movie with personal data like status, rating, and notes

---

## Project Structure
personal-project-MyMovieHub/
backend/
mymoviehub/         → Django project settings and main URLs
movies/             → Movie model, TMDB search, save, recommendations, trailer
user_movies/        → UserMovie model and CRUD endpoints
auth_api/           → Register, login, logout endpoints
manage.py
requirements.txt
frontend/
src/
components/     → Navbar, MovieCard, RatingStars
context/        → Auth context
pages/          → Login, Register, Dashboard, AddMovie, MovieDetails
index.css           → Global galaxy theme

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register/` | No | Create a new account |
| POST | `/auth/login/` | No | Login and receive a token |
| POST | `/auth/logout/` | Yes | Logout and delete token |
| GET | `/movies/search/?query=` | Yes | Search movies via TMDB |
| POST | `/movies/save/` | Yes | Save a movie to the database |
| GET | `/movies/recommendations/` | Yes | Get TasteDive recommendations |
| GET | `/movies/<id>/trailer/` | Yes | Get YouTube trailer key |
| GET | `/user-movies/` | Yes | Get user's movie list |
| POST | `/user-movies/add/` | Yes | Add a movie to the list |
| GET | `/user-movies/<id>/` | Yes | Get a single movie entry |
| PUT | `/user-movies/<id>/update/` | Yes | Update status, rating, notes |
| DELETE | `/user-movies/<id>/delete/` | Yes | Remove a movie from the list |

---

## Setup and Installation

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- Git

> The `.env` file is included in this repository for presentation purposes.
> It contains the API keys needed to run the app — no additional setup required.

---

### 1. Clone the repository

```bash
git clone https://github.com/Michael3255/MyMovieHub.git
cd MyMovieHub
```

---

### 2. Start the app

```bash
./start.sh
```

Or alternatively:

```bash
docker compose up --build
```

This will automatically:
- Build the backend and frontend containers
- Install all dependencies
- Run database migrations
- Start the Django backend at `http://127.0.0.1:8000`
- Start the React frontend at `http://localhost:5173`

---

### 3. Open the app

Visit `http://localhost:5173` in your browser, register an account, and start tracking movies.

---

### Stopping the app

```bash
./stop.sh
```

Or alternatively:

```bash
docker compose down
```

## What I Learned

- Building a REST API with Django REST Framework from scratch
- Token-based authentication flow between a Django backend and React frontend
- Connecting to and consuming third-party APIs (TMDB and TasteDive)
- Managing global state in React using the Context API
- Component level styling with CSS Modules
- Git workflow with conventional commit messages
- Full-stack project structure and organization

---

## Author

**Mikey** — Full Stack Engineering Student

---

## Acknowledgements

- [TMDB](https://www.themoviedb.org/) for the movie database API
- [TasteDive](https://tastedive.com/) for the recommendation API
- CLAUDE for styling