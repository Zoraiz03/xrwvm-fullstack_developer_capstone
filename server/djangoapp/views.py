import json
import logging
from django.http import JsonResponse
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel
from .populate import initiate

# Logger
logger = logging.getLogger(__name__)

# ---------------------------
# User Login API
# ---------------------------
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('userName')
            password = data.get('password')

            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"userName": username, "status": "Authenticated"}, status=200)
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=401)
        except Exception as e:
            logger.error(f"Login error: {str(e)}")
            return JsonResponse({"error": "Invalid request"}, status=400)
    return JsonResponse({"error": "POST request required"}, status=405)


# ---------------------------
# User Registration API
# ---------------------------
@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('userName')
            email = data.get('email')
            password = data.get('password')
            first_name = data.get('firstName', '')
            last_name = data.get('lastName', '')

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Already Registered"}, status=400)

            user = User.objects.create_user(
                username=username, 
                email=email, 
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            user.save()

            return JsonResponse({"message": "User registered successfully", "userName": username, "status": "Registered"}, status=201)
        except Exception as e:
            logger.error(f"Registration error: {str(e)}")
            return JsonResponse({"error": "Invalid request"}, status=400)
    return JsonResponse({"error": "POST request required"}, status=405)


# ---------------------------
# User Logout API
# ---------------------------
@csrf_exempt
def logout_user(request):
    if request.method == 'GET' or request.method == 'POST':
        try:
            logout(request)
            return JsonResponse({"status": "Logged out successfully"}, status=200)
        except Exception as e:
            logger.error(f"Logout error: {str(e)}")
            return JsonResponse({"error": "Logout failed"}, status=400)
    return JsonResponse({"error": "GET or POST request required"}, status=405)


# ---------------------------
# Get Cars API
# ---------------------------
@csrf_exempt
def get_cars(request):
    count = CarMake.objects.filter().count()
    print(count)
    if(count == 0):
        initiate()
    car_models = CarModel.objects.select_related('car_make')
    cars = []
    for car_model in car_models:
        cars.append({"CarModel": car_model.name, "CarMake": car_model.car_make.name})
    return JsonResponse({"CarModels":cars})