"""
URL configuration for testadso project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.documentation import include_docs_urls
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('lista/', views.lista, name='lista'),
    path('inicio/', views.casa, name='casa'),
    path('react/', views.react, name='react'),
    path('usuarios/', include('usuarios.urls')),  
    path('adso/', include('adso.urls')),
    path('emp/', include('empleado.urls')),
    path('nomina/', include('nomina.urls')),
    path('docs/', include_docs_urls(title='Documentacion Rest Usuario')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
