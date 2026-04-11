#!/bin/bash

echo "Starting MyMovieHub..."

# Start the Django backend
echo "Starting backend..."
cd backend
source venv/bin/activate
python manage.py migrate
python manage.py runserver &

# Go back to root and start the React frontend
echo "Starting frontend..."
cd ../frontend
npm install
npm run dev &

echo ""
echo "MyMovieHub is running!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://127.0.0.1:8000"
echo ""

# Wait so both servers keep running
wait