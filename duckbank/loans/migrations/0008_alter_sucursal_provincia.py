# Generated by Django 5.0.4 on 2024-11-29 00:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0007_customuser_sucursal_alter_sucursal_provincia'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sucursal',
            name='provincia',
            field=models.CharField(max_length=255),
        ),
    ]
