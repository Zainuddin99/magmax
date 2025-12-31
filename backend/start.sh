#!/bin/bash
set -e

# Run migrations (database is available at runtime)
echo "Running database migrations..."
python manage.py migrate --noinput

# Collect static files (if not already collected)
echo "Collecting static files..."
python manage.py collectstatic --noinput || true

# Start Gunicorn
echo "Starting Gunicorn server..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:$PORT

