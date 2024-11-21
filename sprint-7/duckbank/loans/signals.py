from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Account
from .models import Cliente, Cuenta

@receiver(post_save, sender=User)
def create_account(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance, balance=1000000)

# @receiver(post_save, sender=Cliente)
# def crear_cuenta_al_crear_cliente(sender, instance, created, **kwargs):
#     if created:
#         Cuenta.objects.create(
#             customer_id=instance,
#             balance=1200000,
#             iban='ES12345678901234567890'
#         )