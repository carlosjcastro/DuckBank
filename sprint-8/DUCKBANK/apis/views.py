from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets
from apis.models import Sucursal, Tarjeta, Cliente, Cuenta, Prestamo
from apis.serializers import SucursalSerializer, TarjetaSerializer,ClienteSerializer, CuentaSerializer, PrestamoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SucursalAPI(APIView):
    #List
    def get(self, request):
        print (request.__dict__)
        sucursales=Sucursal.objects.all()
        serializer = SucursalSerializer(sucursales, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    
class TarjetaAPI(APIView):
    def get(self, request, client_id):
        tarjetas= Tarjeta.objects.filter(cliente_id=client_id)
        serializer = TarjetaSerializer(tarjetas, many=True)

class ClienteViewAPI(APIView):
    def get(self,request, pk):
        cliente=Cliente.objects.get(pk=pk)
        serializer= ClienteSerializer(cliente)
        return Response(serializer.data, status= status.HTTP_200_OK)
        
class BalanceViewAPI(APIView):
    def get(self, request, fk):
        balance= Cuenta.objects.get(customer_id=fk)
        serializer= CuentaSerializer(balance)
        return Response(serializer.data, status= status.HTTP_200_OK)  

class PrestamoAPI(APIView):
    def get(self,request, fk):
        prestamos=Prestamo.objects.get(customer_id=fk)
        serializer= PrestamoSerializer(prestamos)
        return Response(serializer.data, status= status.HTTP_200_OK)  



class BalanceViewSet(viewsets.ModelViewSet):
    queryset=Cuenta.objects.all()
    serializer_class = PrestamoSerializer

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset=Prestamo.objects.all()
    serializer_class = PrestamoSerializer


class SucursalViewSet(viewsets.ModelViewSet):
    queryset=Sucursal.objects.all()
    serializer_class = SucursalSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset=Cliente.objects.all()
    serializer_class = ClienteSerializer

class TarjetaViewSet(viewsets.ModelViewSet):
    queryset=Tarjeta.objects.all()
    serializer_class = TarjetaSerializer
