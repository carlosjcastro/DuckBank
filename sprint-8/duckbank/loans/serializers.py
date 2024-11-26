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

    def validate(self, data):
        required_fields = ['user', 'customer_name', 'customer_surname', 'customer_dni', 'dob', 'branch_id']
        for field in required_fields:
            if not data.get(field):
                raise serializers.ValidationError({field: "Este campo es obligatorio."})
        return data

class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'

class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = '__all__'

    def validate_monto(self, value):
        if value <= 0:
            raise serializers.ValidationError("El monto debe ser mayor que 0.")
        return value

    def validate_motivo(self, value):
        if not value:
            raise serializers.ValidationError("El motivo es obligatorio.")
        return value

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'

class TarjetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarjeta
        fields = '__all__'

