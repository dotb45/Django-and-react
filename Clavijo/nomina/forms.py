from django import forms
from .models import Nomina

class NominaForm(forms.ModelForm):
    class Meta:
        model = Nomina
        fields = '__all__'
        exclude = ['horas_extras_diurnas', 'horas_extras_nocturnas', 'horas_extras_diurnas_dominicales']
        widgets = {
            'photo': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }


class HorasExtrasForm(forms.ModelForm):
    class Meta:
        model = Nomina
        fields = ['horas_extras_diurnas', 'horas_extras_nocturnas', 'horas_extras_diurnas_dominicales']
        widgets = {
            'horas_extras_diurnas': forms.NumberInput(attrs={'class': 'form-control'}),
            'horas_extras_nocturnas': forms.NumberInput(attrs={'class': 'form-control'}),
            'horas_extras_diurnas_dominicales': forms.NumberInput(attrs={'class': 'form-control'}),
        }

