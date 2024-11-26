from rest_framework import serializers
from apis.models import Sucursal, Cliente, Tarjeta, Cuenta, Prestamo

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields =('branch_id','branch_name', ' branch_adress')
       
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields=( 'customer_name','customer_surname','customer_dni' ,'branch_id', 'direccion')
        read_only_fields=("customer_id",'contraseña')
        
class TarjetaSerializer(serializers. ModelSerializer):
    class Meta:
        model= Tarjeta
        fields=( 'numero', 'cvv' ,'fecha_otorgamiento',  'fecha_expiracion' ,'tipo')
        read_only=('cliente_id')
        
class CuentaSerializer(serializers.ModelSerializer):
    class Meta: 
        model= Cuenta
        fields = ('balance', 'iban' )
        read_only=('customer_id')
        
class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Prestamo
        fields= ( 'loan_type', 'loan_date', 'loan_total')
        read_only=('loan_id' ,'customer_id')