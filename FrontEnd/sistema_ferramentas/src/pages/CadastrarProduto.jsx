import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import estilos from "../styles/CadastrarProduto.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Validação corrigida
const schemaProduto = z.object({
    nome: z.string().min(1, "Digite o nome do produto"),
    categoria_id: z.string().min(1, "Selecione uma categoria"),
    tamanho: z.string().min(1, "Informe o tamanho"),
    peso: z.string().min(1, "Informe o peso"),
    quantidadeAtual: z.string().min(1, "Informe a quantidade atual"),
    estoque_minimo: z.string().min(1, "Informe o estoque mínimo"),
});

export function CadastrarProduto() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaProduto)
    });

    // 🔹 Buscar categorias ao carregar a página
    useEffect(() => {
        async function carregarCategorias() {
            try {
                const token = localStorage.getItem("access_token");

                const response = await axios.get(
                    "http://127.0.0.1:8000/app/categorias/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        }

        carregarCategorias();
    }, []);

    async function enviarFormulario(data) {
        try {
            const token = localStorage.getItem("access_token");

            await axios.post(
                "http://127.0.0.1:8000/app/produtos/",
                {
                    nome: data.nome,
                    categoria_id: data.categoria_id,
                    tamanho: parseFloat(data.tamanho),
                    peso: parseFloat(data.peso),
                    quantidadeAtual: parseInt(data.quantidadeAtual),
                    ativo: true,
                    estoque_minimo: parseFloat(data.estoque_minimo)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            alert("Produto cadastrado com sucesso!");
            navigate("/home");

        } catch (error) {
            console.error(error.response?.data || error);
            alert("Erro ao cadastrar produto!");
        }
    }

    return (
        <div className={estilos.container}>
            <h2 className={estilos.titulo}>Cadastrar Produto</h2>

            <form onSubmit={handleSubmit(enviarFormulario)} className={estilos.form}>

                <label className={estilos.label}>Nome</label>
                <input
                    {...register("nome")}
                    className={estilos.input}
                    placeholder="Nome do produto"
                />
                {errors.nome && <p className={estilos.error}>{errors.nome.message}</p>}

                {/* 🔹 SELECT DE CATEGORIA */}
                <label className={estilos.label}>Categoria</label>
                <select
                    {...register("categoria_id")}
                    className={estilos.input}
                >
                    <option value="">Selecione...</option>

                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nome_categoria}
                        </option>
                    ))}
                </select>
                {errors.categoria_id && <p className={estilos.error}>{errors.categoria_id.message}</p>}

                <label className={estilos.label}>Tamanho</label>
                <input
                    {...register("tamanho")}
                    className={estilos.input}
                    placeholder="Ex: 10.5"
                />

                <label className={estilos.label}>Peso</label>
                <input
                    {...register("peso")}
                    className={estilos.input}
                    placeholder="Ex: 0.85"
                />

                <label className={estilos.label}>Quantidade Atual</label>
                <input
                    {...register("quantidadeAtual")}
                    className={estilos.input}
                    type="number"
                />

                <label className={estilos.label}>Estoque mínimo</label>
                <input
                    {...register("estoque_minimo")}
                    className={estilos.input}
                    placeholder="Ex: 5"
                />

                <button type="submit" className={estilos.botao}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
}