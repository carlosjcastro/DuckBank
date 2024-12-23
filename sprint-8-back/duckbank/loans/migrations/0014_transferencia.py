# Generated by Django 5.0.4 on 2024-11-29 14:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0013_userprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transferencia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('monto', models.DecimalField(decimal_places=2, max_digits=10)),
                ('comentario', models.TextField(blank=True, null=True)),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('emisor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transferencias_emitidas', to=settings.AUTH_USER_MODEL)),
                ('receptor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transferencias_recibidas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
