#!/bin/bash

echo "Starting backend..."

ROOT_DIR=$(pwd)

cd "$ROOT_DIR/backend"

"$ROOT_DIR/backend/venv/bin/pip" install -r requirements.txt
"$ROOT_DIR/backend/venv/bin/python" manage.py migrate
"$ROOT_DIR/backend/venv/bin/python" manage.py runserver