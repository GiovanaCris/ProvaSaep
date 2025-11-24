from rest_framework import serializers
from .models import Usuario, Categoria, Produto, MovimentacaoProduto
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

#Login
class LoginSerializer(TokenObtainPairSerializer):
    username_field = 'nome'

# Usuário
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

# Categoria
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

# Produto
class ProdutoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(),
        source='categoria',
        write_only=True
    )

    class Meta:
        model = Produto
        fields = [
            'id',
            'nome',
            'descricao',
            'quantidade',
            'quantidade_minima',
            'peso',
            'categoria',
            'categoria_id',
        ]


#Movimentação de produto
class MovimentacaoSerializer(serializers.ModelSerializer):
    produto = ProdutoSerializer(read_only=True)
    produto_id = serializers.PrimaryKeyRelatedField(
        queryset=Produto.objects.all(),
        source='produto',
        write_only=True
    )

    usuario = UsuarioSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(),
        source='usuario',
        write_only=True
    )

    class Meta:
        model = MovimentacaoProduto
        fields = [
            'id',
            'tipo',
            'quantidade',
            'data',
            'produto',
            'produto_id',
            'usuario',
            'usuario_id',
        ]
