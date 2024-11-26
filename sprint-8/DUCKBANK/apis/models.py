from django.db import models

# Create your models here.
from django.db import models

class Marca(models.Model):
    id=models.IntegerField(primary_key=True)
    descripcion= models.TextField()
    
    

class Sucursal(models.Model):
    branch_id=models.IntegerField(primary_key=True)
    branch_number=models.IntegerField()
    branch_name=models.TextField()
    branch_adress_id=models.IntegerField()
    branch_adress=models.CharField(max_length=200)
    
class Cliente(models.Model):
    customer_id=models.IntegerField(primary_key=True)
    customer_name=models.TextField()
    customer_surname=models.TextField()
    customer_dni=models.IntegerField()
    dob=models.DateField()
    branch_id=models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    direccion=models.CharField(max_length=200)
    contraseña=models.CharField(max_length=100)

class Cuenta(models.Model):
    account_id=models.IntegerField(primary_key=True)
    customer_id=models.ForeignKey(Cliente, on_delete=models.CASCADE)
    balance=models.IntegerField()
    iban=models.TextField()
    
class Prestamo(models.Model):
    loan_id=models.IntegerField(primary_key=True)
    loan_type=models.TextField()
    loan_date=models.DateField()
    loan_total=models.PositiveIntegerField()
    customer_id=models.ForeignKey(Cliente, on_delete=models.CASCADE)

class Empleado(models.Model):
    employee_id=models.IntegerField(primary_key=True)
    employee_name=models.TextField()
    employee_surname=models.TextField()
    employee_hire_date=models.DateField()
    employee_DNI=models.PositiveIntegerField()
    branch_id=models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    
class Tarjeta(models.Model):
    id= models.IntegerField(primary_key=True)
    numero=models.IntegerField(max_length=20)
    cvv=models.IntegerField(max_length=3)
    fecha_otorgamiento=models.DateField()
    fecha_expiracion=models.DateField()
    tipo=models.TextField()
    marca_id=models.ForeignKey(Marca, on_delete=models.CASCADE)
    cliente_id=models.ForeignKey(Cliente, on_delete=models.CASCADE)
    