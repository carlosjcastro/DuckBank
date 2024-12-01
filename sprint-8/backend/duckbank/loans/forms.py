from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from .models import Cliente, Sucursal, Cuenta, Tarjeta
from datetime import date, timedelta
from random import randint

class LoanApplicationForm(forms.Form):
    CLIENT_TYPE_CHOICES = [
        ('BLACK', 'Black'),
        ('GOLD', 'Gold'),
        ('CLASSIC', 'Classic'),
    ]
    LOAN_TYPE_CHOICES = [
        ('PERSONAL', 'Personal'),
        ('MORTGAGE', 'Mortgage'),
        ('CAR', 'Car'),
    ]

    client_type = forms.ChoiceField(choices=CLIENT_TYPE_CHOICES, label="Tipo de Cliente")
    loan_type = forms.ChoiceField(choices=LOAN_TYPE_CHOICES, label="Tipo de Préstamo")
    start_date = forms.DateField(widget=forms.SelectDateWidget, label="Fecha de Inicio")
    amount_requested = forms.DecimalField(max_digits=10, decimal_places=2, label="Monto Solicitado")

    def clean_amount_requested(self):
        client_type = self.cleaned_data.get("client_type")
        amount_requested = self.cleaned_data.get("amount_requested")
        
        limits = {
            'BLACK': 500000,
            'GOLD': 300000,
            'CLASSIC': 100000,
        }
        
        if amount_requested > limits[client_type]:
            raise ValidationError(f"El monto solicitado excede el límite para el tipo de cliente {client_type}.")
        
        return amount_requested

class RegistroForm(forms.ModelForm):
    username = forms.CharField(
        max_length=150, 
        required=True, 
        label="Nombre de usuario",
        widget=forms.TextInput(attrs={'placeholder': 'Ingrese su nombre de usuario'})
    )
    password1 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Ingrese su contraseña'}),
        required=True,
        label="Contraseña"
    )
    password2 = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Repita su contraseña'}),
        required=True,
        label="Confirmar contraseña"
    )
    customer_name = forms.CharField(
        max_length=100, 
        required=True, 
        label="Nombre", 
        widget=forms.TextInput(attrs={'placeholder': 'Ingrese su nombre'})
    )
    customer_surname = forms.CharField(
        max_length=100, 
        required=True, 
        label="Apellido", 
        widget=forms.TextInput(attrs={'placeholder': 'Ingrese su apellido'})
    )
    customer_dni = forms.IntegerField(
        required=True, 
        label="DNI", 
        widget=forms.NumberInput(attrs={'placeholder': 'Ingrese su DNI'})
    )
    dob = forms.DateField(
        required=True,
        label="Fecha de Nacimiento",
        widget=forms.SelectDateWidget(years=range(1900, date.today().year + 1))
    )
    branch_id = forms.ModelChoiceField(
        queryset=Sucursal.objects.all(),
        required=True,
        empty_label="Seleccione una sucursal",
        label="Sucursal"
    )

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")

        if password1 != password2:
            raise ValidationError("Las contraseñas no coinciden.")
        
        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()

        # Permite crear un cliente al crear un usuario
        cliente = Cliente.objects.create(
            user=user,
            customer_name=self.cleaned_data['customer_name'],
            customer_surname=self.cleaned_data['customer_surname'],
            customer_dni=self.cleaned_data['customer_dni'],
            dob=self.cleaned_data['dob'],
            branch_id=self.cleaned_data['branch_id']
        )

        # Permite crear una cuenta al crear un cliente
        Cuenta.objects.create(
            customer_id=cliente,
            balance=1000,
            iban='ES12345678901234567890'
        )

        # Se crea una tarjeta si la sucursal tiene una marca asociada
        sucursal = self.cleaned_data['branch_id']
        if sucursal.marca:
            Tarjeta.objects.create(
                cliente_id=cliente,
                numero=self.generar_numero_tarjeta(),
                cvv=self.generar_cvv(),
                fecha_otorgamiento=date.today(),
                fecha_expiracion=date.today() + timedelta(days=365 * 5),
                tipo="Débito",
                marca_id=sucursal.marca
            )

        return user

    def generar_numero_tarjeta(self):
        from random import randint
        return randint(4000000000000000, 4999999999999999)

    def generar_cvv(self):
        from random import randint
        return randint(100, 999)