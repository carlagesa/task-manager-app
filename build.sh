#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files (for Django Admin, etc.)
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate