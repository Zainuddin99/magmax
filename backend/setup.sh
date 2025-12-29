#!/bin/bash

# MagMax Backend Setup Script
# This script automates the Django backend setup process

echo "🚀 MagMax Backend Setup"
echo "======================="
echo ""

# Check if we're in the backend directory
if [ ! -f "manage.py" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from example..."
    cp env.example .env
    echo "✅ .env file created. Please update with your settings if needed."
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "⚠️  Warning: Docker is not running. Please start Docker Desktop."
    echo "   After starting Docker, run: docker-compose up -d"
else
    # Start PostgreSQL with Docker
    echo "🐘 Starting PostgreSQL database..."
    cd ..
    docker-compose up -d
    cd backend
    
    # Wait for database to be ready
    echo "⏳ Waiting for database to be ready..."
    sleep 5
fi

# Run migrations
echo "🔄 Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Create a superuser: python manage.py createsuperuser"
echo "   2. Start the server: python manage.py runserver"
echo "   3. Access admin: http://localhost:8000/admin/"
echo "   4. Access API: http://localhost:8000/api/v1/"
echo ""
echo "🎉 Happy coding!"



