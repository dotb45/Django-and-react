from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
def adso(request):
    return render(request,'adso/adso.html')


