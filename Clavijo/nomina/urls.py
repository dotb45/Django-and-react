from django.urls import path, include
from .views import obtener_calculos
from rest_framework import routers
from rest_framework.routers import DefaultRouter
from .views import NominaViewSet, obtener_calculos
from . import views

router = DefaultRouter()
router.register(r'nominarest', NominaViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('nomina/nominarest/<int:pk>/', obtener_calculos, name='obtener_calculos'),
    path('nomina/', views.GestionNominaViews.nomina, name='nomina'),
    path('formulario/', views.GestionNominaViews.crearNom, name='nuevo_nom'),
    path('mostrar/<int:id_nomina>/', views.GestionNominaViews.MostrarNomina, name='mostrarnomina'),
    path('editar/<int:id_nomina>/', views.GestionNominaViews.editarNom, name='editarNom'),
    path('actualizar/<int:id_nomina>/', views.GestionNominaViews.actualizarNomina, name='actualizarNomina'),
    path('eliminar/<int:id_nomina>/', views.GestionNominaViews.eliminarNomina, name='eliminarnom'),
    path('confirmardel/<int:id_nomina>/', views.GestionNominaViews.confirmadelNomina, name='deletenom'),
    path('actualizar_horas_extras/<int:id_nomina>/', views.GestionNominaViews.actualizar_horas_extras, name='actualizar_horas_extras'),
    path('api/nomina/<int:id_nomina>/calculos/', obtener_calculos, name='obtener_calculos'),
]
