# Generated by Django 4.2.6 on 2024-05-29 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('documento', models.IntegerField()),
                ('ficha', models.IntegerField()),
                ('programa', models.CharField(max_length=100)),
            ],
        ),
    ]
