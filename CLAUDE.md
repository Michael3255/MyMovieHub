# MyMovieHub — Claude Code Context

## Project Overview
MyMovieHub is a full-stack movie tracking and recommendation web application built as a personal project for a Full Stack Engineering college program.

Users can:
- Register, login, and logout
- Search for movies using the TMDB API
- Add movies to a personal list with a status (watched, watching, want to watch)
- Rate movies 1-5 stars
- Add personal notes to movies
- Get movie recommendations via the TasteDive API

---

## Developer Background
I am a beginner-level Full Stack Engineering student. Code should be written at a beginner friendly level using only concepts I have learned so far.

### What I know:
- Django views using @api_view decorators
- Basic Django models and serializers
- Basic URL routing with path()
- React with useState, useEffect, useContext, useNavigate, useParams
- Fetch API for HTTP requests
- Context API for global auth state
- CSS Modules for component styling
- Token based authentication with Django REST Framework

### What I have NOT learned yet (do not use):
- Class based views in Django
- Advanced Python patterns or comprehensions
- Middleware, signals, or factories
- Axios (use fetch only)
- TypeScript
- Redux (use Context API only)
- Tailwind CSS
- Advanced React patterns like useReducer

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API for auth state
- CSS Modules for styling
- Fetch API only

### Backend
- Django REST Framework
- SQLite (development)
- PostgreSQL (planned for production)
- python-dotenv for environment variables
- Token based authentication

### Infrastructure
- Docker + Docker Compose (planned)
- AWS EC2 (planned deployment)

---

## Project Structure
personal-project-MyMovieHub/
backend/
mymoviehub/         ← Django project settings and main URLs
movies/             ← Movie model, TMDB search, save movie, recommendations
user_movies/        ← UserMovie model, CRUD endpoints
auth_api/           ← Register, login, logout endpoints
venv/
manage.py
.env                ← TMDB_API_KEY and TASTEDIVE_API_KEY (never commit)
frontend/
src/
components/
Navbar.jsx
Navbar.module.css
context/
authContext.jsx
pages/
Login.jsx + Login.module.css
Register.jsx + Register.module.css
Dashboard.jsx
AddMovie.jsx
MovieDetails.jsx
index.css           ← Global galaxy theme styles and CSS variables

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | /auth/register/ | No | Create new account |
| POST | /auth/login/ | No | Login and get token |
| POST | /auth/logout/ | Yes | Delete token |
| GET | /movies/search/?query= | Yes | Search TMDB |
| POST | /movies/save/ | Yes | Save movie to database |
| GET | /movies/recommendations/ | Yes | Get TasteDive recommendations |
| GET | /user-movies/ | Yes | Get user's movie list |
| POST | /user-movies/add/ | Yes | Add movie to list |
| GET | /user-movies/<id>/ | Yes | Get single movie details |
| PUT | /user-movies/<id>/update/ | Yes | Update status, rating, notes |
| DELETE | /user-movies/<id>/delete/ | Yes | Remove movie from list |

---

## Authentication
- Uses Django REST Framework Token Authentication
- Token is stored in localStorage on the frontend
- Every protected request sends: `Authorization: Token <token>`

---

## Environment Variables
Backend `.env` file needs:
TMDB_API_KEY=your_key_here
TASTEDIVE_API_KEY=your_key_here

---

## Current Styling Approach
- Global galaxy theme in `frontend/src/index.css`
- Dark purple and blue color scheme with cyan and pink accents
- CSS variables defined in `:root` for consistent colors
- CSS Modules for component level styles
- Animated galaxy background with twinkling stars and glowing orbs
- Fonts: Bebas Neue for headings, DM Sans for body text

### CSS Variable Reference
```css
--bg-primary: #05051a
--bg-secondary: #0a0a2e
--bg-card: #0d0d35
--accent-primary: #7b2fff (purple)
--accent-secondary: #00d4ff (cyan)
--accent-pink: #ff2d7a
--text-primary: #ffffff
--text-secondary: #a0a8cc
--border-color: #1e1e5a
```

---

## What Still Needs to Be Built
- Dashboard full redesign with CSS Modules and Netflix style horizontal scroll rows
- AddMovie page redesign with CSS Modules
- MovieDetails page redesign with CSS Modules and trailer embed
- Docker setup
- AWS EC2 deployment
- README

---

## Important Notes
- Never use class based views in Django
- Never use axios, always use fetch
- Always use CSS Modules for new component styles
- Always add brief comments describing what functions do
- Follow conventional commit messages: feat:, fix:, chore:, docs:
- The backend runs on http://127.0.0.1:8000
- The frontend runs on http://localhost:5173