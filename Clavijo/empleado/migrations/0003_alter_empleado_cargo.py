# Generated by Django 4.2.6 on 2024-05-30 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empleado', '0002_alter_empleado_apellido_alter_empleado_direccion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='empleado',
            name='cargo',
            field=models.CharField(max_length=50),
        ),
    ]
