from django.urls import path , include 
from . import views
from rest_framework import routers
from usuarios import views


router=routers.DefaultRouter()
router.register(r'usuariosrest', views. UsuarioViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path("",views.UsuarioViews.home,name='homeusuaios'),
    path('lista/',views.UsuarioViews.usuarioslist,name='usuario_list'),
    path('lista1/',views.UsuarioViews.usuariolista,name='usuario_lista'),
    path('formulario/',views.UsuarioViews.CrearUsarios,name='nuevo_usua'),
    path ('saludar/<int:id_usuario>',views.UsuarioViews.SaludarUsuario,name='saludousuario'),
    path ('editar/<int:id_usuario>',views.UsuarioViews.editarUsuario,name='editarusr'),
    path('actualizar/<int:id_usuario>/', views.UsuarioViews.actualizarUsuario, name='actualizarusr')

]