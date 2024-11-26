from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apis.views import SucursalAPI, ClienteViewAPI,ClienteViewSet,CuentaSerializer, TarjetaAPI


router=DefaultRouter()
router.register('Sucursal2', ClienteViewSet)
urlpatterns = [
    
path("",include(router.urls)),
path ("sucursales/",ClienteViewAPI.as_view() ),

]