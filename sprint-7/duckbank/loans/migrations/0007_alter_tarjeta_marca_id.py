# Generated by Django 5.0.4 on 2024-11-21 15:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0006_sucursal_marca'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarjeta',
            name='marca_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='loans.marca'),
        ),
    ]