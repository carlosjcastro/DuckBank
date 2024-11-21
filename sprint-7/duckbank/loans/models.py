from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.user.username} - Balance: {self.balance}"

class LoanRequest(models.Model):
    CLIENT_CHOICES = [
        ('BLACK', 'BLACK'),
        ('GOLD', 'GOLD'),
        ('CLASSIC', 'CLASSIC'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    client_type = models.CharField(max_length=20, choices=CLIENT_CHOICES)
    loan_type = models.CharField(max_length=100)
    start_date = models.DateField()
    amount_requested = models.DecimalField(max_digits=10, decimal_places=2)
    approved_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"{self.user.username} - {self.amount_requested}"
    
#

class Marca(models.Model):
    id = models.IntegerField(primary_key=True)
    descripcion = models.TextField()

class Sucursal(models.Model):
    branch_id = models.AutoField(primary_key=True)
    branch_number = models.IntegerField()
    branch_name = models.TextField()
    branch_address_id = models.IntegerField()

    def __str__(self):
        return self.branch_name

class Cliente(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    customer_name = models.TextField()
    customer_surname = models.TextField()
    customer_dni = models.IntegerField()
    dob = models.DateField()
    branch_id = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.customer_name} {self.customer_surname}"

class Cuenta(models.Model):
    account_id = models.IntegerField(primary_key=True)
    customer_id = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    balance = models.IntegerField()
    iban = models.TextField()

    def __str__(self):
        return f"Cuenta {self.account_id} - Balance: {self.balance}"

class Prestamo(models.Model):
    loan_id = models.IntegerField(primary_key=True)
    loan_type = models.TextField()
    loan_date = models.DateField()
    loan_total = models.PositiveIntegerField()
    customer_id = models.ForeignKey(Cliente, on_delete=models.CASCADE)

class Empleado(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    employee_name = models.TextField()
    employee_surname = models.TextField()
    employee_hire_date = models.DateField()
    employee_DNI = models.PositiveIntegerField()
    branch_id = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

class Tarjeta(models.Model):
    id = models.IntegerField(primary_key=True)
    numero = models.IntegerField()
    cvv = models.IntegerField()
    fecha_otorgamiento = models.DateField()
    fecha_expiracion = models.DateField()
    tipo = models.TextField()
    marca_id = models.ForeignKey(Marca, on_delete=models.CASCADE)
    cliente_id = models.ForeignKey(Cliente, on_delete=models.CASCADE)

    def __str__(self):
        return f"Tarjeta {self.numero} - {self.tipo}"
