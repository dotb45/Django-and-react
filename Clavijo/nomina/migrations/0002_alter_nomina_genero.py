# Generated by Django 4.2.6 on 2024-06-06 14:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nomina', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nomina',
            name='genero',
            field=models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino'), ('O', 'Otro')], max_length=100),
        ),
    ]
