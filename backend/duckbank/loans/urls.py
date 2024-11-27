from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login_view, loan_application_view, loan_application_result, loan_history, logout_view,show_client_data, list_cards, registro, list_accounts, AccountViewSet, LoanRequestViewSet, MarcaViewSet, SucursalViewSet, ClienteViewSet, CuentaViewSet, PrestamoViewSet, EmpleadoViewSet, TarjetaViewSet, RegistroView
)
from rest_framework_simplejwt import views as jwt_views

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
    path('api/', include(router.urls)), # rutas del API REST
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/registro/', RegistroView.as_view(), name='registro'),
]