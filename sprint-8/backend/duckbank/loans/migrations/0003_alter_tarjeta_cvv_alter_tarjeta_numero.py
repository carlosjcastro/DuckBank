# Generated by Django 5.0.4 on 2024-11-21 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0002_marca_sucursal_cliente_cuenta_prestamo_empleado_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarjeta',
            name='cvv',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='tarjeta',
            name='numero',
            field=models.IntegerField(),
        ),
    ]
