from rest_framework import viewsets, permissions
from .models import CustomUser, Loan, Card, Customer, Sucursal
import random
from datetime import datetime
from django.utils import timezone
from .serializers import UserSerializer, LoanSerializer, CardSerializer, CustomerSerializer, DirectionSerializer,  SucursalSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken, UntypedToken
from rest_framework.decorators import api_view
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated]

class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    permission_classes = [permissions.IsAuthenticated]

#Agregados
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer
    permission_classes = [permissions.IsAuthenticated]


# Esto permite iniciar sesión en el Frontend luego de registrar un usuario
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "user": {
                    "username": user.username,
                    "email": user.email,
                }
            }, status=status.HTTP_200_OK)
        return Response({"detail": "Credenciales inválidas."}, status=status.HTTP_401_UNAUTHORIZED)

# Esto permite registrar un usuario en el Frontend y Backend
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("usuario")
        password = request.data.get("password")
        dni = request.data.get("dni")

        if CustomUser.objects.filter(username=username).exists():
            return Response({"detail": "El nombre de usuario ya está en uso."}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(username=username, password=password)
        user.dni = dni
        user.save()

        return Response({"detail": "Usuario creado exitosamente."}, status=status.HTTP_201_CREATED)
    
    # Esto permite validar el token en el Frontend
class ValidateTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            token = request.headers.get('Authorization').split()[1]
            UntypedToken(token)
            print("Token válido recibido")
            return Response({"detail": "Token válido"}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error al validar token: {str(e)}")
            return Response({"detail": "Token inválido"}, status=status.HTTP_401_UNAUTHORIZED)
     
# Esto permite solicitar un préstamo en el Frontend   
class SolicitarPrestamoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        monto = request.data.get("monto")
        motivo = request.data.get("motivo")
        comentario = request.data.get("comentario", "")

        if not monto or not motivo:
            return Response({"detail": "El monto y el motivo son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            monto = float(monto)
        except ValueError:
            return Response({"detail": "El monto debe ser un número válido."}, status=status.HTTP_400_BAD_REQUEST)

        if monto > 5000:
            return Response({"detail": "El monto excede el límite permitido."}, status=status.HTTP_400_BAD_REQUEST)

        loan = Loan.objects.create(
            user=user,
            monto=monto,
            motivo=motivo,
            comentario=comentario,
            aprobado=True,
            fecha_aprobacion=timezone.now()
        )

        serializer = LoanSerializer(loan)

        return Response({
            "status": "aprobado" if loan.aprobado else "rechazado",
            "monto": loan.monto,
            "fecha": loan.fecha_solicitud,
            "motivo": loan.motivo,
            "comentario": loan.comentario,
        }, status=status.HTTP_201_CREATED)

# Esto permite mostrar préstamos solicitaros por el usuario en el Frontend
class ObtenerPrestamosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        prestamos = Loan.objects.filter(user=user)
        serializer = LoanSerializer(prestamos, many=True)
        return Response(serializer.data, status=200)

# Esto permite mostrar préstamos solicitados por el usuario en el Frontend
@api_view(['GET'])
def mis_prestamos(request):
    loans = Loan.objects.filter(user=request.user)
    loan_data = []

    for loan in loans:
        loan_info = {
            'id': loan.id,
            'monto': loan.monto,
            'motivo': loan.motivo,
            'comentario': loan.comentario or "Ninguno",
            'status': 'Aprobado' if loan.aprobado else 'Rechazado',
            'fecha_solicitud': loan.fecha_solicitud,
        }
        loan_data.append(loan_info)

    return Response(loan_data)

##AGREGADOS 

class ObtenerTarjetasView(APIView): 
    permission_classes = [IsAuthenticated]

    def get(self, request): #Devuelve todas las tarjetas de ese user
        user = request.user
        tarjetas = Card.objects.filter(user=user)
        serializer = CardSerializer(tarjetas, many=True)
        return Response(serializer.data, status=200)
    
   

@api_view(['GET'])
def mis_tarjetas(request):
    tarjetas=Card.objects.filter(user=request.user)
    tarjetas_data=[]
    for tarjeta in tarjetas:
        tarjeta_info={
            'numero': Card.number,
            'expiration_date': Card.expiration_date,
            'type': Card.type,
            'cvv': Card.cvv,
        }
        tarjetas_data.append(tarjeta_info)
   
    return Response(tarjetas_data)

class CustomerView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        clientes = Customer.objects.filter(user=request.user)
        serializer = CustomerSerializer(clientes)
        return Response(serializer.data)

        
    
class DirectionAPI(APIView):
     permission_classes = [IsAuthenticated]  
     
     def post(self,request):
         customer= Customer.objects.filter(user=request.user)
         serializer=  DirectionSerializer(customer, data=request.data)

         if serializer.is_valid():
             serializer.save()
             return Response({"Sucursal Actualizada", serializer.data}, status=status.HTTP_200_OK) 
         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class SucursalView(APIView):
      permission_classes = [IsAuthenticated]  
    
      def get(self, request):       #Devuelve todas las sucursales
        sucursales = Sucursal.objects.all()
        serializer = SucursalSerializer(Sucursal)
        return Response(serializer.data)
    
     
    
    

    