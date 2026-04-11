#!/bin/bash

echo "Starting MyMovieHub..."

# Get the root directory of the project
ROOT_DIR=$(pwd)

# Set up and start the Django backend
echo "Setting up backend..."
cd "$ROOT_DIR/backend"
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver &

# Set up and start the React frontend
echo "Setting up frontend..."
cd "$ROOT_DIR/frontend"
npm install
npm run dev &

echo ""
echo "MyMovieHub is running!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://127.0.0.1:8000"
echo ""
echo "Press Ctrl+C to stop both servers"

wait