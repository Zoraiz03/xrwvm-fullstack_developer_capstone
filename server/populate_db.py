#!/usr/bin/env python3
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoproj.settings')
django.setup()

from djangoapp.models import CarMake, CarModel

# Delete all existing data
print("Deleting existing data...")
CarModel.objects.all().delete()
CarMake.objects.all().delete()

# Populate the database
print("Populating database...")
from djangoapp.populate import initiate
initiate()

# Verify
print(f"CarMake count: {CarMake.objects.count()}")
print(f"CarModel count: {CarModel.objects.count()}")

# List all car models
print("\nCar Models:")
for car_model in CarModel.objects.all():
    print(f"  {car_model}")
