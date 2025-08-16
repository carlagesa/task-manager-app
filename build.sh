#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Build the React frontend
cd client
npm install
npm run build
cd ..

# Collect static files (including the frontend build)
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate