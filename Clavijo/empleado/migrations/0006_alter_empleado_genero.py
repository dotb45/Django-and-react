# Generated by Django 4.2.6 on 2024-06-04 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empleado', '0005_empleado_salario_empleado_tipo_documento'),
    ]

    operations = [
        migrations.AlterField(
            model_name='empleado',
            name='genero',
            field=models.CharField(choices=[('MASCULINO', 'M'), ('FEMENINO', 'F'), ('OTRO', 'OTRO')], max_length=100),
        ),
    ]
