from rest_framework import serializers
from .models import CustomUser, Loan, Card,  Customer,  Sucursal

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'address', 'balance']

class LoanSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()

    class Meta:
        model = Loan
        fields = ['id', 'monto', 'motivo', 'comentario', 'status', 'fecha_solicitud']

    def get_status(self, obj):
        return 'Aprobado' if obj.aprobado else 'Rechazado'
        
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'user', 'number', 'expiration_date', 'cvv','type', 'creation_date']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model: Customer
        fields =[   'user', 'customer_name','customer_surname',  ' customer_dni,'  'dob', 'branch_id','balance','iban']

class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model: Customer
        fields=['branch_id']
        
class SucursalSerializer (serializers.ModelSerializer):
    class Meta:
        model: Sucursal
        fields =[   'branch_id' ,'branch_number ', 'branch_name','branch_address' ]