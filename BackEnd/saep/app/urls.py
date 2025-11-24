from django.urls import path
from .views import (
    loginView,
    UsuarioListCreate, UsuarioUpdateDestroy,
    CategoriaListCreate, CategoriaUpdateDestroy,
    ProdutoListCreate, ProdutoUpdateDestroy,
    MovimentacaoListCreate, MovimentacaoUpdateDestroy
)

urlpatterns = [
    #Login
    path('userlogin/', loginView.as_view()),

    # Usuários
    path('usuarios/', UsuarioListCreate.as_view()),
    path('usuarios/<int:pk>/', UsuarioUpdateDestroy.as_view()),

    # Categorias
    path('categorias/', CategoriaListCreate.as_view()),
    path('categorias/<int:pk>/', CategoriaUpdateDestroy.as_view()),

    # Produtos
    path('produtos/', ProdutoListCreate.as_view()),
    path('produtos/<int:pk>/', ProdutoUpdateDestroy.as_view()),

    # Movimentações
    path('movimentacoes/', MovimentacaoListCreate.as_view()),
    path('movimentacoes/<int:pk>/', MovimentacaoUpdateDestroy.as_view()),
]