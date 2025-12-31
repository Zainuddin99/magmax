#!/usr/bin/env python
"""Create a superuser non-interactively."""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Create superuser - CHANGE THESE VALUES!
username = os.environ.get('ADMIN_USERNAME', 'admin')
email = os.environ.get('ADMIN_EMAIL', 'admin@example.com')
password = os.environ.get('ADMIN_PASSWORD', 'ChangeThisPassword123!')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f'✅ Superuser "{username}" created successfully!')
    print(f'Username: {username}')
    print(f'Password: {password}')
    print('⚠️  IMPORTANT: Change the password after first login!')
else:
    print(f'ℹ️  Superuser "{username}" already exists!')

