# Generated by Django 5.0.4 on 2024-11-21 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0003_alter_tarjeta_cvv_alter_tarjeta_numero'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sucursal',
            old_name='branch_adress_id',
            new_name='branch_address_id',
        ),
        migrations.AlterField(
            model_name='sucursal',
            name='branch_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
