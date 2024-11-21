from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from .models import Cliente, Sucursal

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
    username = forms.CharField(max_length=150, required=True)
    password1 = forms.CharField(widget=forms.PasswordInput, required=True)
    password2 = forms.CharField(widget=forms.PasswordInput, required=True)
    customer_name = forms.CharField(max_length=100, required=True)
    customer_surname = forms.CharField(max_length=100, required=True)
    customer_dni = forms.IntegerField(required=True)
    dob = forms.DateField(widget=forms.SelectDateWidget(years=range(1900, 2025)), required=True)
    
    branch_id = forms.ModelChoiceField(
        queryset=Sucursal.objects.all(),
        required=True,
        empty_label="Seleccione una sucursal",
        to_field_name='branch_id',
        widget=forms.Select(attrs={'class': 'form-control'})
    )

    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get("password1")
        password2 = cleaned_data.get("password2")
        
        if password1 != password2:
            raise forms.ValidationError("Las contraseñas no coinciden.")
        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()

        cliente = Cliente(
            user=user,
            customer_name=self.cleaned_data['customer_name'],
            customer_surname=self.cleaned_data['customer_surname'],
            customer_dni=self.cleaned_data['customer_dni'],
            dob=self.cleaned_data['dob'],
            branch_id=self.cleaned_data['branch_id']
        )
        cliente.save()
        return user