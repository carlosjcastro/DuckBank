from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .forms import LoanApplicationForm
from django.contrib.auth.models import User
from .forms import RegistroForm
from .models import LoanRequest, Account, Tarjeta, Cliente, Cuenta, Sucursal, Marca, Prestamo, Empleado
from django.contrib import messages
import random
from datetime import date, timedelta
import logging

# Configurar el logger
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)
import json
from django.http import JsonResponse
from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .serializers import AccountSerializer, LoanRequestSerializer, MarcaSerializer, SucursalSerializer, ClienteSerializer, CuentaSerializer, PrestamoSerializer, EmpleadoSerializer, TarjetaSerializer, RegistroSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return JsonResponse({'error': 'Todos los campos son obligatorios.'}, status=400)

    # Autenticar usuario
    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({'error': 'Credenciales inválidas.'}, status=401)

    # Generar tokens JWT
    refresh = RefreshToken.for_user(user)
    return JsonResponse({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }, status=200)

# Se muestra la vista para aplicar al préstamo
@login_required
def loan_application_view(request):
    form = LoanApplicationForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            client_type = form.cleaned_data['client_type']
            amount_requested = form.cleaned_data['amount_requested']

            # Se muestran los limites de acuerdo al tipo de cliente
            limits = {'BLACK': 500000, 'GOLD': 300000, 'CLASSIC': 100000}
            limit = limits.get(client_type, 0)

            if amount_requested > limit:
                form.add_error('amount_requested', f'Monto excede el límite para tipo {client_type}.')
                return render(request, 'loans/loan_application.html', {'form': form})
            else:
                loan_request = LoanRequest.objects.create(
                    user=request.user,
                    client_type=client_type,
                    loan_type=form.cleaned_data['loan_type'],
                    start_date=form.cleaned_data['start_date'],
                    amount_requested=amount_requested
                )
                return redirect('loan_application_result', loan_id=loan_request.id)

    return render(request, 'loans/loan_application.html', {'form': form})

# Se muestra la lista del resultado de la solicitud
@login_required
def loan_application_result(request, loan_id):
    try:
        loan_request = LoanRequest.objects.get(id=loan_id, user=request.user)
    except LoanRequest.DoesNotExist:
        return redirect('loan_application')

    # Se muestra la validación si es aprobada la solicitud
    approved = False
    if loan_request.client_type == 'BLACK' and loan_request.amount_requested <= 500000:
        approved = True
    elif loan_request.client_type == 'GOLD' and loan_request.amount_requested <= 300000:
        approved = True
    elif loan_request.client_type == 'CLASSIC' and loan_request.amount_requested <= 100000:
        approved = True

    # Se actualiza el saldo de la cuenta si la solicitud es aprobada
    if approved:
        loan_request.status = 'APPROVED'
        loan_request.approved_amount = loan_request.amount_requested
        loan_request.save()

        account, created = Account.objects.get_or_create(user=request.user)
        if account.balance >= loan_request.approved_amount:
            account.balance -= loan_request.approved_amount
            account.save()
        else:
            loan_request.status = 'REJECTED'
            loan_request.save()
            approved = False
    else:
        loan_request.status = 'REJECTED'
        loan_request.save()

    return render(request, 'loans/loan_application_result.html', {
        'loan_request': loan_request,
        'approved': approved
    })

# Se muestra la vista con la lista de cuentas
@login_required
def list_accounts(request):
    try:
        cliente = Cliente.objects.get(user=request.user)
        cuentas = Cuenta.objects.filter(customer_id=cliente)
        return render(request, 'loans/list_accounts.html', {'cuentas': cuentas})
    except Cliente.DoesNotExist:
        messages.error(request, 'No se encontró un cliente asociado a tu cuenta. Por favor, contacta al soporte.')
        return render(request, 'loans/list_accounts.html', {'cuentas': None})

# Se muestra la vista con la lista de tarjetas
@login_required    
def list_cards(request):
    try:
        cliente = Cliente.objects.get(user=request.user)
        tarjeta = Tarjeta.objects.filter(cliente_id=cliente)
        return render(request, 'loans/list_cards.html', {'tarjeta': tarjeta})
    except Cliente.DoesNotExist:
        return redirect('apply')

# Se muestra la vista para mostrar los datos del cliente
@login_required
def show_client_data(request):
    try:
        # Esto permite obtener el cliente asociado al usuario
        cliente = Cliente.objects.get(user=request.user)
        
        # Esto permite obtener las cuentas y tarjetas asociadas al cliente
        cuentas = Cuenta.objects.filter(customer_id=cliente)
        tarjetas = Tarjeta.objects.filter(cliente_id=cliente)

        # Se pasan los datos del cliente por contexto
        context = {
            'user': request.user,
            'cliente': cliente,
            'cuentas': cuentas,
            'tarjetas': tarjetas,
            'dni': cliente.customer_dni,
        }
        return render(request, 'loans/show_client_data.html', context)
    except Cliente.DoesNotExist:
        # Si no se encuentra un cliente asociado al usuario, se muestra un mensaje de error
        return render(request, 'loans/show_client_data.html', {
            'error': 'No se encontró un cliente asociado a tu cuenta. Por favor, contacta al soporte.'
        })

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .forms import LoanApplicationForm
from django.contrib.auth.models import User
from .forms import RegistroForm
from .models import LoanRequest, Account, Tarjeta, Cliente, Cuenta, Sucursal, Marca, Prestamo, Empleado
from django.contrib import messages
import random
from datetime import date, timedelta
from django.http import JsonResponse
from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from .serializers import AccountSerializer, LoanRequestSerializer, MarcaSerializer, SucursalSerializer, ClienteSerializer, CuentaSerializer, PrestamoSerializer, EmpleadoSerializer, TarjetaSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return JsonResponse({'error': 'Todos los campos son obligatorios.'}, status=400)

    # Autenticar usuario
    user = authenticate(request, username=username, password=password)
    if user is None:
        return JsonResponse({'error': 'Credenciales inválidas.'}, status=401)

    # Generar tokens JWT
    refresh = RefreshToken.for_user(user)
    return JsonResponse({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }, status=200)

# Se muestra la vista para aplicar al préstamo
@login_required
def loan_application_view(request):
    form = LoanApplicationForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            client_type = form.cleaned_data['client_type']
            amount_requested = form.cleaned_data['amount_requested']

            # Se muestran los limites de acuerdo al tipo de cliente
            limits = {'BLACK': 500000, 'GOLD': 300000, 'CLASSIC': 100000}
            limit = limits.get(client_type, 0)

            if amount_requested > limit:
                form.add_error('amount_requested', f'Monto excede el límite para tipo {client_type}.')
                return render(request, 'loans/loan_application.html', {'form': form})
            else:
                loan_request = LoanRequest.objects.create(
                    user=request.user,
                    client_type=client_type,
                    loan_type=form.cleaned_data['loan_type'],
                    start_date=form.cleaned_data['start_date'],
                    amount_requested=amount_requested
                )
                return redirect('loan_application_result', loan_id=loan_request.id)

    return render(request, 'loans/loan_application.html', {'form': form})

# Se muestra la lista del resultado de la solicitud
@login_required
def loan_application_result(request, loan_id):
    try:
        loan_request = LoanRequest.objects.get(id=loan_id, user=request.user)
    except LoanRequest.DoesNotExist:
        return redirect('loan_application')

    # Se muestra la validación si es aprobada la solicitud
    approved = False
    if loan_request.client_type == 'BLACK' and loan_request.amount_requested <= 500000:
        approved = True
    elif loan_request.client_type == 'GOLD' and loan_request.amount_requested <= 300000:
        approved = True
    elif loan_request.client_type == 'CLASSIC' and loan_request.amount_requested <= 100000:
        approved = True

    # Se actualiza el saldo de la cuenta si la solicitud es aprobada
    if approved:
        loan_request.status = 'APPROVED'
        loan_request.approved_amount = loan_request.amount_requested
        loan_request.save()

        account, created = Account.objects.get_or_create(user=request.user)
        if account.balance >= loan_request.approved_amount:
            account.balance -= loan_request.approved_amount
            account.save()
        else:
            loan_request.status = 'REJECTED'
            loan_request.save()
            approved = False
    else:
        loan_request.status = 'REJECTED'
        loan_request.save()

    return render(request, 'loans/loan_application_result.html', {
        'loan_request': loan_request,
        'approved': approved
    })

# Se muestra la vista con la lista de cuentas
@login_required
def list_accounts(request):
    try:
        cliente = Cliente.objects.get(user=request.user)
        cuentas = Cuenta.objects.filter(customer_id=cliente)
        return render(request, 'loans/list_accounts.html', {'cuentas': cuentas})
    except Cliente.DoesNotExist:
        messages.error(request, 'No se encontró un cliente asociado a tu cuenta. Por favor, contacta al soporte.')
        return render(request, 'loans/list_accounts.html', {'cuentas': None})

# Se muestra la vista con la lista de tarjetas
@login_required    
def list_cards(request):
    try:
        cliente = Cliente.objects.get(user=request.user)
        tarjeta = Tarjeta.objects.filter(cliente_id=cliente)
        return render(request, 'loans/list_cards.html', {'tarjeta': tarjeta})
    except Cliente.DoesNotExist:
        return redirect('apply')

# Se muestra la vista para mostrar los datos del cliente
@login_required
def show_client_data(request):
    try:
        # Esto permite obtener el cliente asociado al usuario
        cliente = Cliente.objects.get(user=request.user)
        
        # Esto permite obtener las cuentas y tarjetas asociadas al cliente
        cuentas = Cuenta.objects.filter(customer_id=cliente)
        tarjetas = Tarjeta.objects.filter(cliente_id=cliente)

        # Se pasan los datos del cliente por contexto
        context = {
            'user': request.user,
            'cliente': cliente,
            'cuentas': cuentas,
            'tarjetas': tarjetas,
            'dni': cliente.customer_dni,
        }
        return render(request, 'loans/show_client_data.html', context)
    except Cliente.DoesNotExist:
        # Si no se encuentra un cliente asociado al usuario, se muestra un mensaje de error
        return render(request, 'loans/show_client_data.html', {
            'error': 'No se encontró un cliente asociado a tu cuenta. Por favor, contacta al soporte.'
        })

def registro(request):
    if request.method == 'POST':
        formulario = RegistroForm(request.POST)

        if formulario.is_valid():
            # Se guarda el usuario
            user = formulario.save()
            
            # Log de la creación del usuario
            logger.info(f"Usuario registrado: {user.username}, Correo: {user.email}")

            # Permite redirigir al usuario a la página de login
            login(request, user)

            messages.success(request, "¡Registro exitoso! Bienvenido.")
            return redirect('login')
        
        else:
            messages.error(request, "Por favor, corrija los errores.")
            logger.warning("Errores en el formulario de registro.")
    
    else:
        formulario = RegistroForm()

    return render(request, 'loans/registro.html', {'form': formulario})

# def generar_numero_tarjeta():
#     return random.randint(1000000000000000, 9999999999999999)

# def generar_cvv():
#     return random.randint(100, 999)

# def generar_fecha_expiracion():
#     fecha_expiracion = date.today() + timedelta(days=365*2)
#     return fecha_expiracion

# Se muestra la vista para el historial de préstamos
@login_required
def loan_history(request):
    loan_requests = LoanRequest.objects.filter(user=request.user).order_by('-start_date')
    return render(request, 'loans/loan_history.html', {'loan_requests': loan_requests})

def logout_view(request):
    logout(request)
    return redirect('login')

#Agrego las vistas del API REST 
class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def saldo(self, request):
            Account = Account.objects.get(cliente__user=request.user)
            return Response({'saldo': Account.saldo})

class LoanRequestViewSet(viewsets.ModelViewSet):
    queryset = LoanRequest.objects.all()
    serializer_class = LoanRequestSerializer

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def listado(self, request):
        sucursales = Sucursal.objects.all()
        serializer = SucursalSerializer(sucursales, many=True)
        return Response(serializer.data)

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def datos(self, request):
        cliente = Cliente.objects.get(user=request.user)
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)
    
    @action(detail=False, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def direccion(self, request):
        cliente = Cliente.objects.get(user=request.user)
        cliente.direccion = request.data.get('direccion')
        cliente.save()
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)

class CuentaViewSet(viewsets.ModelViewSet):
    queryset = Cuenta.objects.all()
    serializer_class = CuentaSerializer

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def cliente(self, request):
        prestamos = Prestamo.objects.filter(cliente__user=request.user)
        serializer = PrestamoSerializer(prestamos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def sucursal(self, request):
        if not request.user.is_staff:
            return Response({'error': 'No autorizado'}, status=403)
        prestamos = Prestamo.objects.filter(sucursal__empleados__user=request.user)
        serializer = PrestamoSerializer(prestamos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def solicitud(self, request):
        if not request.user.is_staff:
            return Response({'error': 'No autorizado'}, status=403)
        serializer = PrestamoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['delete'], permission_classes=[permissions.IsAuthenticated])
    def anular(self, request):
        if not request.user.is_staff:
            return Response({'error': 'No autorizado'}, status=403)
        prestamo_id = request.data.get('id')
        prestamo = Prestamo.objects.get(id=prestamo_id)
        prestamo.delete()
        return Response(status=204)

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class TarjetaViewSet(viewsets.ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def cliente(self, request):
        tarjetas = Tarjeta.objects.filter(cliente__user=request.user)
        serializer = TarjetaSerializer(tarjetas, many=True)
        return Response(serializer.data)

# def generar_numero_tarjeta():
#     return random.randint(1000000000000000, 9999999999999999)

# def generar_cvv():
#     return random.randint(100, 999)

# def generar_fecha_expiracion():
#     fecha_expiracion = date.today() + timedelta(days=365*2)
#     return fecha_expiracion

# Se muestra la vista para el historial de préstamos
@login_required
def loan_history(request):
    loan_requests = LoanRequest.objects.filter(user=request.user).order_by('-start_date')
    return render(request, 'loans/loan_history.html', {'loan_requests': loan_requests})

def logout_view(request):
    logout(request)
    return redirect('login')

#Agrego las vistas del API REST 
class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def saldo(self, request):
            Account = Account.objects.get(cliente__user=request.user)
            return Response({'saldo': Account.saldo})

class LoanRequestViewSet(viewsets.ModelViewSet):
    queryset = LoanRequest.objects.all()
    serializer_class = LoanRequestSerializer

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def listado(self, request):
        sucursales = Sucursal.objects.all()
        serializer = SucursalSerializer(sucursales, many=True)
        return Response(serializer.data)

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def datos(self, request):
        cliente = Cliente.objects.get(user=request.user)
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)
    
    @action(detail=False, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def direccion(self, request):
        cliente = Cliente.objects.get(user=request.user)
        cliente.direccion = request.data.get('direccion')
        cliente.save()
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)

class CuentaViewSet(viewsets.ModelViewSet):
    queryset = Cuenta.objects.all()
    serializer_class = CuentaSerializer

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def cliente(self, request):
        prestamos = Prestamo.objects.filter(cliente__user=request.user)
        serializer = PrestamoSerializer(prestamos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def sucursal(self, request):
        if not request.user.is_staff:
            return Response({'error': 'No autorizado'}, status=403)
        prestamos = Prestamo.objects.filter(sucursal__empleados__user=request.user)
        serializer = PrestamoSerializer(prestamos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def solicitud(self, request):
        if not request.user.is_staff:
            return Response({'error': 'No autorizado'}, status=403)
        serializer = PrestamoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['delete'], permission_classes=[permissions.IsAuthenticated])
    def anular(self, request):
        if not request.user.is_staff:
            return Response({'error': 'No autorizado'}, status=403)
        prestamo_id = request.data.get('id')
        prestamo = Prestamo.objects.get(id=prestamo_id)
        prestamo.delete()
        return Response(status=204)

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class TarjetaViewSet(viewsets.ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def cliente(self, request):
        tarjetas = Tarjeta.objects.filter(cliente__user=request.user)
        serializer = TarjetaSerializer(tarjetas, many=True)
        return Response(serializer.data)
    
class RegistroView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': '¡Registro exitoso!'}, status=201)
        return Response(serializer.errors, status=400)