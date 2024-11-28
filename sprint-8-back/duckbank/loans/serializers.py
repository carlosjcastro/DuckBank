from rest_framework import serializers
from .models import CustomUser, Loan, Card

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
        fields = ['id', 'user', 'number', 'expiration_date', 'cvv']
