from rest_framework import viewsets
from .models import FoodItem, Supplier, Purchase, Sale
from .serializers import FoodItemSerializer, SupplierSerializer, PurchaseSerializer, SaleSerializer

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import jwt
from datetime import datetime, timedelta
from django.conf import settings

# Secret key for JWT encoding/decoding
SECRET_KEY = settings.SECRET_KEY

# Registration API
@api_view(['POST'])
def register(request):
    try:
        # Get data from request
        username = request.data.get('username')
        password = request.data.get('password')
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create_user(username=username, password=password)
        user.user_type = user_type  # Set user type (admin/employee)
        user.save()

        return JsonResponse({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# Login API
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate the user
    user = authenticate(request, username=username, password=password)

    if user:
        # Check if the user has is_staff set to True
        if not user.is_staff:
            return JsonResponse({'message': 'User is not authorized'}, status=status.HTTP_403_FORBIDDEN)

        # Generate JWT token
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        user_data = {
            'id': user.id,
            'username': user.username,
            'token': token
        }

        return JsonResponse({'user': user_data}, status=status.HTTP_200_OK)

    return JsonResponse({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
