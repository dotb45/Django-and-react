from django.db import models
from django.utils import timezone

class Nomina(models.Model):
    GENERO = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro')
    )
    ESTADO = (
        ('D', 'Dependiente'),
        ('I', 'Independiente'),
    )
    RIESGO = (
        ('1', 'Nivel 1'),
        ('2', 'Nivel 2'),
        ('3', 'Nivel 3'),
        ('4', 'Nivel 4'),
        ('5', 'Nivel 5'),
    )
    TIPO_CONTRATO_CHOICES = [
        ('TF', 'Término Fijo'),
        ('TI', 'Término Indefinido'),
        ('P', 'Prácticas'),
    ]

    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    documento = models.CharField(max_length=20, unique=True)
    genero = models.CharField(choices=GENERO, max_length=1)
    estado = models.CharField(choices=ESTADO, max_length=1)
    email = models.EmailField(max_length=100)
    sueldo = models.FloatField()
    photo = models.ImageField(upload_to='fotos/')
    nivel_riesgo = models.CharField(choices=RIESGO, max_length=1)
    horas_extras_diurnas = models.IntegerField(default=0)
    horas_extras_nocturnas = models.IntegerField(default=0)
    horas_extras_diurnas_dominicales = models.IntegerField(default=0)
    fecha_contratacion = models.DateField(default=timezone.now)
    tipo_contrato = models.CharField(max_length=2, choices=TIPO_CONTRATO_CHOICES)
    fecha_fin_contrato = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} - {self.apellido} - {self.genero}"

class CalculosSeguridadSocial(models.Model):
    nomina = models.ForeignKey(Nomina, on_delete=models.CASCADE, related_name='calculos')
    pensiones = models.FloatField()
    salud = models.FloatField()
    base = models.FloatField()
    arl = models.FloatField(default=0)
    caja_compensacion = models.FloatField(default=0)
    prima = models.FloatField(default=0)
    auxilio_transporte = models.FloatField(default=0)
    fecha_calculo = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Calculos para {self.nomina.nombre} {self.nomina.apellido} el {self.fecha_calculo}"







