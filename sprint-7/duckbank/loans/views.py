from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .forms import LoanApplicationForm
from .forms import RegistroForm
from .models import LoanRequest, Account, Tarjeta, Cliente, Cuenta
from django.contrib import messages

# Se muestra la vista para iniciar sesión
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                messages.success(request, 'Inicio de sesión exitoso.')
                return redirect('loan_application')
            else:
                messages.error(request, 'Usuario o contraseña incorrectos.')
        else:
            messages.error(request, 'Por favor, completá todos los campos correctamente.')
    else:
        form = AuthenticationForm()

    return render(request, 'loans/login.html', {'form': form})

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

# Se muestra la vista para el registro de un nuevo usuario
def registro(request):
    if request.method == 'POST':
        formulario = RegistroForm(request.POST)
        if formulario.is_valid():
            user = formulario.save()
            login(request, user)
            messages.success(request, "¡Registro exitoso! Bienvenido.")
            return redirect('login')
        else:
            print("Formulario no válido")
            print(formulario.errors)
            messages.error(request, "Por favor, corrija los errores.")
    else:
        formulario = RegistroForm()

    return render(request, 'loans/registro.html', {'form': formulario})

# Se muestra la vista para el historial de préstamos
@login_required
def loan_history(request):
    loan_requests = LoanRequest.objects.filter(user=request.user).order_by('-start_date')
    return render(request, 'loans/loan_history.html', {'loan_requests': loan_requests})

def logout_view(request):
    logout(request)
    return redirect('login')
