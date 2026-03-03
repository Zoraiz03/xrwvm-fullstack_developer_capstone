from .models import CarMake, CarModel

def initiate():
    car_make_data = [
        {"name": "Toyota", "description": "Japanese automaker"},
        {"name": "Honda", "description": "Japanese automaker"},
        {"name": "Ford", "description": "American automaker"},
        {"name": "BMW", "description": "German automaker"},
        {"name": "Chevrolet", "description": "American automaker"},
    ]

    car_model_data = [
        {"name": "Camry", "type": "Sedan", "year": 2023, "make": "Toyota"},
        {"name": "Corolla", "type": "Sedan", "year": 2022, "make": "Toyota"},
        {"name": "RAV4", "type": "SUV", "year": 2023, "make": "Toyota"},
        {"name": "Civic", "type": "Sedan", "year": 2023, "make": "Honda"},
        {"name": "CR-V", "type": "SUV", "year": 2022, "make": "Honda"},
        {"name": "Mustang", "type": "Coupe", "year": 2023, "make": "Ford"},
        {"name": "F-150", "type": "Truck", "year": 2023, "make": "Ford"},
        {"name": "3 Series", "type": "Sedan", "year": 2023, "make": "BMW"},
        {"name": "X5", "type": "SUV", "year": 2022, "make": "BMW"},
        {"name": "Malibu", "type": "Sedan", "year": 2023, "make": "Chevrolet"},
    ]

    for make_data in car_make_data:
        make, _ = CarMake.objects.get_or_create(
            name=make_data["name"],
            defaults={"description": make_data["description"]}
        )

    for model_data in car_model_data:
        make = CarMake.objects.get(name=model_data["make"])
        CarModel.objects.get_or_create(
            name=model_data["name"],
            car_make=make,
            defaults={
                "car_type": model_data["type"],
                "year": model_data["year"],
                "dealer_id": 1,
            }
        )