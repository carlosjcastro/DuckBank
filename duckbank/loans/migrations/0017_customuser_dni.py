# Generated by Django 5.0.4 on 2024-11-29 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loans', '0016_customuser_alias_customuser_cbu'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='dni',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
