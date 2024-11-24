from rest_framework import serializers
from .models import Account, LoanRequest, Marca, Sucursal, Cliente, Cuenta, Prestamo, Empleado, Tarjeta

#Remplazamos all en donde me digan
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class LoanRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanRequest
        fields = '__all__'

class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = '__all__'

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'

class TarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarjeta
        fields = '__all__'

