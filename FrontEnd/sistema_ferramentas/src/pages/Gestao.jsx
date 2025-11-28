// Gestao.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import estilos from '../styles/Gestao.module.css';
import { useForm } from "react-hook-form";

// Substitua pelo token JWT do seu login
const TOKEN = localStorage.getItem("access_token");

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/app",
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
});

export function Gestao() {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editProduto, setEditProduto] = useState(null);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const res = await api.get("/produtos/");
                setProdutos(res.data);
            } catch (err) {
                console.error("Erro ao carregar produtos:", err);
            }
        };

        const fetchCategorias = async () => {
            try {
                const res = await api.get("/categorias/");
                setCategorias(res.data);
            } catch (err) {
                console.error("Erro ao carregar categorias:", err);
            }
        };

        fetchProdutos();
        fetchCategorias();
    }, []);

    const handleEdit = async (produto) => {
        const nome = prompt("Editar nome do produto:", produto.nome);
        if (!nome) return;

        const categoriaId = prompt(
            "Digite o ID da categoria:",
            produto.categoria.id
        );
        if (!categoriaId) return;

        const tamanho = prompt("Editar tamanho:", produto.tamanho);
        const peso = prompt("Editar peso:", produto.peso);
        const quantidadeAtual = prompt("Editar quantidade:", produto.quantidadeAtual);
        const estoque_minimo = prompt("Editar estoque mínimo:", produto.estoque_minimo);
        const ativo = window.confirm("O produto está ativo?");

        const data = {
            nome,
            categoria: categoriaId,
            tamanho: parseFloat(tamanho),
            peso: parseFloat(peso),
            quantidadeAtual: parseInt(quantidadeAtual),
            estoque_minimo: parseFloat(estoque_minimo),
            ativo,
        };

        try {
            await api.put(`/produtos/${produto.id}/`, data);
            setProdutos(prev =>
                prev.map(p => (p.id === produto.id ? { ...p, ...data } : p))
            );
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
        }
    };

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
                    {produtos.map((p) => (
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
                                    onClick={() => handleEdit(p)}
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