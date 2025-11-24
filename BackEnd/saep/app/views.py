from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, Categoria, Produto, MovimentacaoProduto
from .serializers import (
    LoginSerializer,
    UsuarioSerializer,
    CategoriaSerializer,
    ProdutoSerializer,
    MovimentacaoSerializer
)

#Login
class loginView(TokenObtainPairView):
    serializer_class = LoginSerializer

#CRUD usuários
class UsuarioListCreate(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]


class UsuarioUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        nome = instance.nome
        self.perform_destroy(instance)
        return Response(
            {"detail": f"Usuário '{nome}' deletado!"},
            status=status.HTTP_200_OK
        )

#CRUD categoria
class CategoriaListCreate(ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]


class CategoriaUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        nome = instance.nome_categoria
        self.perform_destroy(instance)
        return Response(
            {"detail": f"Categoria '{nome}' deletada!"},
            status=status.HTTP_200_OK
        )

#CRUD produto
class ProdutoListCreate(ListCreateAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]


class ProdutoUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        nome = instance.nome
        self.perform_destroy(instance)
        return Response(
            {"detail": f"Produto '{nome}' deletado!"},
            status=status.HTTP_200_OK
        )


#CRUD movimentação do produto
class MovimentacaoListCreate(ListCreateAPIView):
    queryset = MovimentacaoProduto.objects.all()
    serializer_class = MovimentacaoSerializer
    permission_classes = [IsAuthenticated]


class MovimentacaoUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = MovimentacaoProduto.objects.all()
    serializer_class = MovimentacaoSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id_mov = instance.id
        self.perform_destroy(instance)
        return Response(
            {"detail": f"Movimentação '{id_mov}' deletada!"},
            status=status.HTTP_200_OK
        )