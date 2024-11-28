from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    address = models.CharField(max_length=255, blank=True, null=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    groups = models.ManyToManyField(
        Group,
        related_name="customuser_set",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_set",
        blank=True
    )
    


class Loan(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    motivo = models.CharField(max_length=255, default="Sin motivo")
    comentario = models.TextField(blank=True, null=True)
    fecha_solicitud = models.DateTimeField(auto_now_add=True)
    aprobado = models.BooleanField(default=False)
    fecha_aprobacion = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.monto} - {'Aprobado' if self.aprobado else 'Rechazado'}"

class Card(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="cards")
    number = models.CharField(max_length=16)
    expiration_date = models.DateField()
    cvv = models.CharField(max_length=3)
    #Agregar el campo tipo para saber si es Debito o Credito
    TIPO_CHOICES = [
        ('crédito', 'Crédito'),
        ('débito', 'Débito'),
    ]
    type = models.CharField(max_length=7, choices=TIPO_CHOICES)  
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}  -- Tarjeta --{self.number}--{self.expiration_date} "
    
    

    
class Sucursal(models.Model):
    branch_id = models.AutoField(primary_key=True)
    branch_number = models.IntegerField()
    branch_name = models.TextField()
    branch_address = models.TextField()
    

    def __str__(self):
        return self.branch_name
    
class Customer(models.Model): 
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    customer_name = models.TextField()
    customer_surname = models.TextField()
    customer_dni = models.IntegerField()
    dob = models.DateField()
    branch_id = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    balance = models.IntegerField()
    iban = models.TextField() 


    def __str__(self):
        return f"{self.customer_name} {self.customer_surname}"   
    
