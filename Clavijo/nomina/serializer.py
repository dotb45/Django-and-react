# serializer.py
from rest_framework import serializers
from .models import Nomina, CalculosSeguridadSocial

class CalculosSeguridadSocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculosSeguridadSocial
        fields = '__all__'

class NominaSerializer(serializers.ModelSerializer):
    calculos = CalculosSeguridadSocialSerializer(many=True, read_only=True)

    class Meta:
        model = Nomina
        fields = '__all__'
