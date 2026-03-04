import json
import logging
import requests
from django.http import JsonResponse
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel
from .populate import initiate

logger = logging.getLogger(__name__)

backend_url = "http://localhost:3030"

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
                username=username, email=email, password=password,
                first_name=first_name, last_name=last_name
            )
            user.save()
            return JsonResponse({"userName": username, "status": "Registered"}, status=201)
        except Exception as e:
            logger.error(f"Registration error: {str(e)}")
            return JsonResponse({"error": "Invalid request"}, status=400)
    return JsonResponse({"error": "POST request required"}, status=405)


# ---------------------------
# User Logout API
# ---------------------------
@csrf_exempt
def logout_user(request):
    username = request.user.username
    logout(request)
    return JsonResponse({"userName": username, "status": "Logged out successfully"}, status=200)


# ---------------------------
# Get Cars API
# ---------------------------
@csrf_exempt
def get_cars(request):
    count = CarMake.objects.filter().count()
    if count == 0:
        initiate()
    car_models = CarModel.objects.select_related('car_make')
    cars = [{"CarModel": cm.name, "CarMake": cm.car_make.name} for cm in car_models]
    return JsonResponse({"CarModels": cars})


# ---------------------------
# Get All Dealerships
# ---------------------------
@csrf_exempt
def get_dealerships(request, state="All"):
    try:
        if state == "All":
            url = f"{backend_url}/fetchDealers"
        else:
            url = f"{backend_url}/fetchDealers/{state}"
        result = requests.get(url)
        dealers = json.loads(result.content)
        return JsonResponse({"status": 200, "dealers": dealers})
    except Exception as e:
        logger.error(f"Error fetching dealerships: {str(e)}")
        return JsonResponse({"status": 500, "error": str(e)})


# ---------------------------
# Get Single Dealer Details
# ---------------------------
@csrf_exempt
def get_dealer_details(request, dealer_id):
    try:
        url = f"{backend_url}/fetchDealer/{dealer_id}"
        result = requests.get(url)
        dealer = json.loads(result.content)
        return JsonResponse({"status": 200, "dealer": dealer})
    except Exception as e:
        logger.error(f"Error fetching dealer: {str(e)}")
        return JsonResponse({"status": 500, "error": str(e)})


# ---------------------------
# Get Dealer Reviews
# ---------------------------
@csrf_exempt
def get_dealer_reviews(request, dealer_id):
    try:
        url = f"{backend_url}/fetchReviews/dealer/{dealer_id}"
        result = requests.get(url)
        reviews = json.loads(result.content)
        return JsonResponse({"status": 200, "reviews": reviews})
    except Exception as e:
        logger.error(f"Error fetching reviews: {str(e)}")
        return JsonResponse({"status": 500, "error": str(e)})


# ---------------------------
# Add a Review
# ---------------------------
@csrf_exempt
def add_review(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            url = f"{backend_url}/insert_review"
            result = requests.post(url, json=data)
            return JsonResponse({"status": 200, "result": json.loads(result.content)})
        except Exception as e:
            logger.error(f"Error adding review: {str(e)}")
            return JsonResponse({"status": 500, "error": str(e)})
    return JsonResponse({"status": 405, "error": "POST required"})