from django.http import HttpResponse
from django.shortcuts import render

def casa(request):
    return HttpResponse('<h1>BACKEND ADSO26722364 - DJANGO</h1>'),


def lista(request):
    return HttpResponse('<ul><li>Uno</li><li>Uno</li><li>Uno</li><ul>')

def home(request):
    return render (request,'home.html')

def react(request):
    return render (request,'react.html')
    