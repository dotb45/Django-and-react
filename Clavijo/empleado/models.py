from typing import Any
from django.db import models

# Create your models here.
class Empleado(models.Model):
    genero=(
        ("MASCULINO","M"),
        ("FEMENINO","F"),
        ("OTRO","OTRO")
    )
    tipo_documento=(
        ("CC","Cedula de cuidadania"),
        ("TI.","Targeta de identificación")
    )
   
      
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    cargo = models.CharField(max_length=50)
    telefono = models.IntegerField()
    direccion = models.CharField(max_length=100)
    salario = models.IntegerField(max_length=300)
    genero = models.CharField(choices=genero , max_length=100)
    photo = models.ImageField(upload_to="fotos/")
    tipo_documento = models.CharField(choices=tipo_documento , max_length=100)
    
    
    
    def __str__(self):
        return self.nombre    
    

        