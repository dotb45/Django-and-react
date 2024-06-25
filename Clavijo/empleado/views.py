from django.http import HttpResponse
from django.shortcuts import render
from . models import Empleado
# Create your views here.


def empleado(request):
    get_empleado =Empleado.objects.all()
    data={
        "get_empleado": get_empleado
    }
    return render(request,'empleado.html',data)