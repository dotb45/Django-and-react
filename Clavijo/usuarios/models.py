from typing import Any
from django.db import models

# Create your models here.
class Usuario(models.Model):
    genero=(
        ("M","MASCULINO"),
        ("F","FEMENINO"),
        ("O","OTRO")
    )
    nombre = models.CharField(max_length=50)
    documento = models.IntegerField()
    ficha = models.IntegerField()
    programa = models.CharField(max_length=100)
    email = models.EmailField(max_length=200,default="")
    genero = models.CharField(choices=genero, max_length=100)
    photo = models.ImageField(upload_to="fotos/")
    
    
    
    def __str__(self):
        return self.nombre    
        
        
