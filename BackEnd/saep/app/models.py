from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class Categoria(models.Model):
    nome_categoria = models.CharField(max_length=255)

    def __str__(self):
        return self.nome_categoria


class Usuario(AbstractUser):
    cargo = models.CharField(max_length=255, blank=True, null=True)

    # Escolha apenas UMA forma de exibir o usuário
    def __str__(self):
        return self.username
        # ou return f"{self.first_name} {self.last_name}"


class Produto(models.Model):
    nome = models.CharField(max_length=255)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    tamanho = models.FloatField()
    peso = models.FloatField()
    quantidadeAtual = models.IntegerField()
    ativo = models.BooleanField(default=True)
    estoque_minimo = models.FloatField()

    def __str__(self):
        return self.nome


class MovimentacaoProduto(models.Model):
    tipo = models.IntegerField()
    quantidade = models.IntegerField()
    data = models.DateField()
    observacao = models.TextField()

    id_produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"Movimentação {self.id} - Produto: {self.id_produto.nome}"