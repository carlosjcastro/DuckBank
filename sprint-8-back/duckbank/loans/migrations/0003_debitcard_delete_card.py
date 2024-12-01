# Generated by Django 5.0.4 on 2024-11-28 22:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0002_rename_requested_at_loan_fecha_solicitud_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='DebitCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.CharField(max_length=16, unique=True)),
                ('tipo', models.CharField(default='Débito', max_length=50)),
                ('fecha_emision', models.DateTimeField(auto_now_add=True)),
                ('fecha_vencimiento', models.DateField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='debit_cards', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Card',
        ),
    ]