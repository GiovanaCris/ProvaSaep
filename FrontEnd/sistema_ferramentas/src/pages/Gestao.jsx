// Gestao.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import estilos from '../styles/Gestao.module.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validação SOMENTE dos campos editáveis
const schemaProduto = z.object({
  quantidadeAtual: z.string().min(1, "Informe a quantidade atual"),
  estoque_minimo: z.string().min(1, "Informe o estoque mínimo"),
});

const TOKEN = localStorage.getItem("access_token");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/app",
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export function Gestao() {
  const [produtos, setProdutos] = useState([]);
  const [editProduto, setEditProduto] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schemaProduto),
  });

  // Carregar produtos
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await api.get("/produtos/");
        setProdutos(res.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    }

    fetchProdutos();
  }, []);

  // Abrir formulário de edição
  const handleEditClick = (produto) => {
    setEditProduto(produto);

    reset({
      quantidadeAtual: String(produto.quantidadeAtual),
      estoque_minimo: String(produto.estoque_minimo),
    });
  };

  // Enviar edição
  const enviarEdicao = async (data) => {
    try {
      const payload = {
        quantidadeAtual: parseInt(data.quantidadeAtual),
        estoque_minimo: parseFloat(data.estoque_minimo),
      };

      await api.patch(`/produtos/${editProduto.id}/`, payload);

      // Atualiza lista sem recarregar
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === editProduto.id
            ? { ...p, ...payload }
            : p
        )
      );

      alert("Produto atualizado com sucesso!");
      setEditProduto(null);

    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      alert("Erro ao atualizar produto!");
    }
  };

  // Deletar produto
  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar este produto?")) return;

    try {
      await api.delete(`/produtos/${id}/`);
      setProdutos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
    }
  };

  return (
    <div className={estilos.container}>
      <h2 className={estilos.titulo}>Gestão de Estoque</h2>

      {/* Formulário de Edição */}
      {editProduto && (
        <div className={estilos.formContainer}>
          <h3>Editar Produto</h3>

          <form onSubmit={handleSubmit(enviarEdicao)} className={estilos.form}>
            
            <label className={estilos.label}>Quantidade Atual</label>
            <input
              {...register("quantidadeAtual")}
              type="number"
              className={estilos.input}
            />
            {errors.quantidadeAtual && (
              <p className={estilos.error}>{errors.quantidadeAtual.message}</p>
            )}

            <label className={estilos.label}>Estoque Mínimo</label>
            <input
              {...register("estoque_minimo")}
              type="number"
              className={estilos.input}
            />
            {errors.estoque_minimo && (
              <p className={estilos.error}>{errors.estoque_minimo.message}</p>
            )}

            <button type="submit" className={estilos.botao}>Salvar</button>
            <button
              type="button"
              onClick={() => setEditProduto(null)}
              className={estilos.cancelButton}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* Tabela */}
      <table className={estilos.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Tamanho</th>
            <th>Peso</th>
            <th>Quantidade</th>
            <th>Estoque Mínimo</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td className={estilos.td}>{p.nome}</td>
              <td className={estilos.td}>{p.categoria.nome_categoria}</td>
              <td className={estilos.td}>{p.tamanho}</td>
              <td className={estilos.td}>{p.peso}</td>
              <td className={estilos.td}>{p.quantidadeAtual}</td>
              <td className={estilos.td}>{p.estoque_minimo}</td>
              <td className={estilos.td}>{p.ativo ? "Sim" : "Não"}</td>

              <td className={estilos.td}>
                <button
                  className={estilos.editButton}
                  onClick={() => handleEditClick(p)}
                >
                  Editar
                </button>

                <button
                  className={estilos.deleteButton}
                  onClick={() => handleDelete(p.id)}
                >
                  Deletar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
