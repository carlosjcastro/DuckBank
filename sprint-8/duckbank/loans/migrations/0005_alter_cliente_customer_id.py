# Generated by Django 5.0.4 on 2024-11-21 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0004_rename_branch_adress_id_sucursal_branch_address_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='customer_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
