from django.contrib import admin
from .models import Usuario, Categoria, Produto, MovimentacaoProduto

admin.site.register(Usuario),
admin.site.register(Categoria),
admin.site.register(Produto),
admin.site.register(MovimentacaoProduto)