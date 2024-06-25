from django.http import HttpResponse
from django.shortcuts import render
from . models import Usuario
from usuarios.forms import UsuarioForm
from. serializer import UsuarioSerializer
from rest_framework import viewsets
from django.http import HttpRequest






class UsuarioViewSet(viewsets.ModelViewSet):
    queryset=Usuario.objects.all()
    serializer_class=UsuarioSerializer

class UsuarioViews(HttpRequest):

    def home(request):
        return render(request,'usuarios/home.html')


    def usuarioslist(request):
        return render(request,'usuariolist.html')


    def usuariolista(request):
        get_usuarios =Usuario.objects.all()
        data={
            "get_usuarios": get_usuarios
        }
        return render(request,'usuariolista.html',data)


    def CrearUsarios(request):
        formulario=UsuarioForm(request.POST,request.FILES)
        
        if formulario.is_valid():
            formulario.save()
            formulario=UsuarioForm()
            
        return render  (request,'formusuarios.html',
                        {"form":formulario,"mensaje":"usuario creado correctamente"})  
        
        
    def SaludarUsuario(request,id_usuario):
        usuario=Usuario.objects.get(pk=id_usuario)
        nombre=usuario.nombre
        data={
            'nombre':nombre,
        }    
        return render (request,'saludousuario.html',data)

    def editarUsuario(request,id_usuario):
        usr = Usuario.objects.get(pk=id_usuario)
        formulario = UsuarioForm (instance=usr)
        return render (request, "editarusuario.html",{"form" :formulario , "usuario" : usr })

    def actualizarUsuario(request , id_usuario):
        usr = Usuario.objects.get(pk=id_usuario)
        formulario=UsuarioForm (request.POST,instance=usr)
        if formulario.is_valid():
            formulario.save()
        usuarios = Usuario.objects.all()
        return render (request,"usuariolista.html",{"get_usuarios": usuarios }) 