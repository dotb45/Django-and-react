# views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.db import transaction
from .forms import NominaForm, HorasExtrasForm
from .models import Nomina, CalculosSeguridadSocial
from .serializer import NominaSerializer, CalculosSeguridadSocialSerializer
from rest_framework import viewsets
from rest_framework.response import Response
import logging
from rest_framework.decorators import api_view

logger = logging.getLogger(__name__)

class GestionNominaViews:

    def nomina(request):
        get_nomina = Nomina.objects.all()
        data = {'get_nomina': get_nomina}
        return render(request, 'nomina.html', data)

    def crearNom(request):
        if request.method == 'POST':
            formulario = NominaForm(request.POST, request.FILES)
            if formulario.is_valid():
                formulario.save()
                formulario = NominaForm()
                mensaje = "Usuario creado correctamente"
            else:
                mensaje = "Error al crear usuario"
        else:
            formulario = NominaForm()
            mensaje = ""

        return render(request, "formnom.html", {"form": formulario, "mensaje": mensaje})

    def MostrarNomina(request, id_nomina):
        nomina = get_object_or_404(Nomina, pk=id_nomina)

        calculos_existentes = CalculosSeguridadSocial.objects.filter(nomina=nomina).first()

        if not calculos_existentes:
            with transaction.atomic():
                pensiones = calcularPensiones(nomina.estado, nomina.sueldo)
                salud = calcularSalud(nomina.estado, nomina.sueldo)
                base = baseCotizacion(nomina.estado, nomina.sueldo)
                arl = calcularARL(nomina.nivel_riesgo, nomina.sueldo)
                caja_compensacion = calcularCajaCompensacion(nomina.estado, nomina.sueldo)
                prima = calcularPrima(nomina.sueldo)
                auxilio_transporte = calcularAuxilioTransporte(nomina.sueldo)

                calculos = CalculosSeguridadSocial(
                    nomina=nomina,
                    pensiones=pensiones,
                    salud=salud,
                    base=base,
                    arl=arl,
                    caja_compensacion=caja_compensacion,
                    prima=prima,
                    auxilio_transporte=auxilio_transporte
                )
                calculos.save()
        else:
            calculos = calculos_existentes

        data = {
            'nombre': nomina.nombre,
            'apellido': nomina.apellido,
            'documento': nomina.documento,
            'pensiones': calculos.pensiones,
            'salud': calculos.salud,
            'base': calculos.base,
            'arl': calculos.arl,
            'caja_compensacion': calculos.caja_compensacion,
            'estado': nomina.estado,
            'prima': calculos.prima,
            'auxilio_transporte': calculos.auxilio_transporte
        }
        return render(request, 'calculos.html', data)

    def eliminarNomina(request, id_nomina):
        nom = Nomina.objects.get(pk=id_nomina)
        formulario = NominaForm(instance=nom)
        return render(request, "eliminarnomina.html", {"form": formulario, "nomina": nom})

    def confirmadelNomina(request, id_nomina):
        nom = Nomina.objects.get(pk=id_nomina)
        nom.delete()
        nomina = Nomina.objects.all()
        return render(request, "nomina.html", {"get_nomina": nomina})   

    def editarNom(request, id_nomina):
        nom = Nomina.objects.get(pk=id_nomina)
        if request.method == 'POST':
            formulario = NominaForm(request.POST, instance=nom)
            if formulario.is_valid():
                formulario.save()
                return redirect('nomina')
        else:
            formulario = NominaForm(instance=nom)
        return render(request, "editarnom.html", {"form": formulario, "nomina": nom})

    def actualizarNomina(request, id_nomina):
        nom = Nomina.objects.get(pk=id_nomina)
        formulario = NominaForm(request.POST, instance=nom)
        if formulario.is_valid():
            formulario.save()
        nomina = Nomina.objects.all()
        return render(request, "formnom.html", {"get_nomina": nomina})

    def actualizar_horas_extras(request, id_nomina):
        nomina = get_object_or_404(Nomina, pk=id_nomina)
        if request.method == 'POST':
            form = HorasExtrasForm(request.POST, instance=nomina)
            if form.is_valid():
                horas_extras_diurnas = form.cleaned_data['horas_extras_diurnas']
                horas_extras_nocturnas = form.cleaned_data['horas_extras_nocturnas']
                horas_extras_diurnas_dominicales = form.cleaned_data['horas_extras_diurnas_dominicales']
                nuevo_sueldo = calcular_nuevo_sueldo(nomina.sueldo, horas_extras_diurnas, horas_extras_nocturnas, horas_extras_diurnas_dominicales)
                nomina.sueldo = nuevo_sueldo
                nomina.horas_extras_diurnas = horas_extras_diurnas
                nomina.horas_extras_nocturnas = horas_extras_nocturnas
                nomina.horas_extras_diurnas_dominicales = horas_extras_diurnas_dominicales
                nomina.save()
                return redirect('nomina')
        else:
            form = HorasExtrasForm(instance=nomina)
        return render(request, 'actualizar_horas_extras.html', {'form': form, 'nomina': nomina})

def calcular_nuevo_sueldo(sueldo, horas_extras_diurnas, horas_extras_nocturnas, horas_extras_diurnas_dominicales):
    valor_hora = sueldo / 235  
    valor_hora_extra_diurna = valor_hora * 1.25
    valor_hora_extra_nocturna = valor_hora * 1.75
    valor_hora_extra_diurna_dominical = valor_hora * 2.0
    total_extras = (horas_extras_diurnas * valor_hora_extra_diurna) + (horas_extras_nocturnas * valor_hora_extra_nocturna) + (horas_extras_diurnas_dominicales * valor_hora_extra_diurna_dominical)
    return sueldo + total_extras

def calcularPensiones(tipo_empleado, salario):
    salario = float(salario)
    if tipo_empleado.upper() == 'I':
        base = salario * 0.40
        pensiones = base * 0.16
    elif tipo_empleado.upper() == 'D':
        pensiones = salario * 0.04
    else:
        raise ValueError("Tipo de empleado no válido")
    return int(pensiones)

def calcularSalud(tipo_empleado, salario):
    salario = float(salario)
    if tipo_empleado.upper() == 'I':
        base = salario * 0.40
        salud = base * 0.125
    elif tipo_empleado.upper() == 'D':
        salud = salario * 0.04
    else:
        raise ValueError("Tipo de empleado no válido")
    return int(salud)

def baseCotizacion(tipo_empleado, salario):
    if tipo_empleado.upper() == 'I':
        base = salario * 0.40
    elif tipo_empleado.upper() == 'D':
        base = salario
    else:
        raise ValueError("Tipo de empleado no válido")
    return int(base)

def calcularARL(nivel_riesgo, salario):
    arl_percent = 0.00522  
    if nivel_riesgo == '1':
        arl_percent = 0.00522
    elif nivel_riesgo == '2':
        arl_percent = 0.01044
    elif nivel_riesgo == '3':
        arl_percent = 0.02436
    elif nivel_riesgo == '4':
        arl_percent = 0.04350
    elif nivel_riesgo == '5':
        arl_percent = 0.06960
    else:
        raise ValueError("Nivel de riesgo no válido")
    arl = salario * arl_percent
    return int(arl)

def calcularCajaCompensacion(tipo_empleado, salario):
    if tipo_empleado.upper() == 'D':
        return int(salario * 0.04)
    return 0

def calcularPrima(salario):
    return int(salario / 12)

def calcularAuxilioTransporte(salario):
    auxilio_transporte = 140606 
    salario_minimo = 1300000
    if salario <= (2 * salario_minimo):
        return auxilio_transporte
    return 0

def obtener_calculos(request, id_nomina):
    nomina = get_object_or_404(Nomina, pk=id_nomina)
    calculos = CalculosSeguridadSocial.objects.filter(nomina=nomina)
    serializer = CalculosSeguridadSocialSerializer(calculos, many=True)
    return Response(serializer.data)

logger = logging.getLogger(__name__)

class NominaViewSet(viewsets.ModelViewSet):
    queryset = Nomina.objects.all()
    serializer_class = NominaSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        logger.info(f"Datos recibidos: {request.data}")

        nuevo_sueldo = calcular_nuevo_sueldo(
            instance.sueldo,
            float(request.data.get('horas_extras_diurnas', 0)),
            float(request.data.get('horas_extras_nocturnas', 0)),
            float(request.data.get('horas_extras_diurnas_dominicales', 0))
        )

        data = request.data.copy()
        data['sueldo'] = nuevo_sueldo
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
    
    
    @api_view(['GET'])
    def obtener_calculos(request, pk):
        nomina = get_object_or_404(Nomina, pk=pk)
        serializer = NominaSerializer(nomina)
        return Response(serializer.data)