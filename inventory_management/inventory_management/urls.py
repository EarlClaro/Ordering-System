from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from inventory.views import FoodItemViewSet, SupplierViewSet, PurchaseViewSet, SaleViewSet
from inventory import views

router = DefaultRouter()
router.register(r'fooditems', FoodItemViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'purchases', PurchaseViewSet)
router.register(r'sales', SaleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    path('api/register/', views.register, name='register'),
    path('api/login/', views.login, name='login'),

]
