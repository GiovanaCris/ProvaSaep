from rest_framework import serializers
from .models import Usuario, Categoria, Produto, MovimentacaoProduto
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# ===================================================
# LOGIN PERSONALIZADO (CORRETO)
# ===================================================
class LoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["cargo"] = getattr(user, "cargo", None)
        token["nome"] = user.first_name if user.first_name else user.username
        return token

    def validate(self, attrs):
        # Aceita username/password OU nome/senha
        username = attrs.get("username") or attrs.get("nome")
        password = attrs.get("password") or attrs.get("senha")

        if not username or not password:
            raise serializers.ValidationError("Credenciais inválidas.")

        # Substitui os nomes para o padrão JWT
        attrs["username"] = username
        attrs["password"] = password

        # Chama a validação do JWT
        data = super().validate(attrs)

        # Retorno personalizado
        data["id"] = self.user.id
        data["username"] = self.user.username
        data["cargo"] = self.user.cargo

        return data

# ===================================================
# USUÁRIO
# ===================================================
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


# ===================================================
# CATEGORIA
# ===================================================
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


# ===================================================
# PRODUTO
# ===================================================
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
            'categoria',
            'categoria_id',
            'tamanho',
            'peso',
            'quantidadeAtual',
            'ativo',
            'estoque_minimo',
        ]


# ===================================================
# MOVIMENTAÇÃO
# ===================================================
class MovimentacaoSerializer(serializers.ModelSerializer):
    produto = ProdutoSerializer(read_only=True)
    produto_id = serializers.PrimaryKeyRelatedField(
        queryset=Produto.objects.all(),
        source='id_produto',
        write_only=True
    )

    usuario = UsuarioSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(),
        source='id_usuario',
        write_only=True
    )

    class Meta:
        model = MovimentacaoProduto
        fields = [
            'id',
            'tipo',
            'quantidade',
            'data',
            'observacao',
            'produto',
            'produto_id',
            'usuario',
            'usuario_id',
        ]