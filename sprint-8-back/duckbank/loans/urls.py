from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoanViewSet, CardViewSet, RegisterView, LoginView
from .views import ValidateTokenView, SolicitarPrestamoView, ObtenerPrestamosView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'loans', LoanViewSet)
router.register(r'cards', CardViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/validate-token/', ValidateTokenView.as_view(), name='validate-token'),
    path('solicitar-prestamo/', SolicitarPrestamoView.as_view(), name='solicitar-prestamo'),
    path('mis-prestamos/', ObtenerPrestamosView.as_view(), name='obtener-prestamos'), 
]
