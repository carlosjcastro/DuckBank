from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login_view, loan_application_view, loan_application_result, loan_history, logout_view,show_client_data, list_cards, registro, list_accounts, AccountViewSet, LoanRequestViewSet, MarcaViewSet, SucursalViewSet, ClienteViewSet, CuentaViewSet, PrestamoViewSet, EmpleadoViewSet, TarjetaViewSet
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

router = DefaultRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'loan-requests', LoanRequestViewSet)
router.register(r'marcas', MarcaViewSet)
router.register(r'sucursales', SucursalViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'cuentas', CuentaViewSet)
router.register(r'prestamos', PrestamoViewSet)
router.register(r'empleados', EmpleadoViewSet)
router.register(r'tarjetas', TarjetaViewSet)

urlpatterns = [
    path('apply/', loan_application_view, name='loan_application'),
    path('apply/result/<int:loan_id>/', loan_application_result, name='loan_application_result'),
    path('history/', loan_history, name='loan_history'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('show_client_data/', show_client_data, name='show_client_data'),
    path('list_cards/', list_cards, name='list_cards'),
    path('registro/', registro, name='registro'),
    path('', login_view, name='login'),
    path('list_accounts/', list_accounts, name='list_accounts'),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/obtener_token/', views.obtener_token, name='obtener_token'),
    path('api/prestamos/', views.loan_application_view, name='loan_application'),
]