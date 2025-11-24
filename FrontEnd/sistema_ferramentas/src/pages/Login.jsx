import axios from "axios";
import { useNavigate } from "react-router-dom";
import estilos from '../styles/Login.module.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaLogin = z.object({
    nome: z.string()
        .min(1, "Informe o nome")
        .max(20, "Máximo de 20 caracteres"),
    senha: z.string()
        .min(1, "Informe sua senha")
        .max(20, "Máximo de 20 caracteres")
});

export function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/app/userlogin/",
                {
                    nome: data.nome,
                    senha: data.senha
                }
            );

            const { access, refresh } = response.data;

            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            alert("Login realizado com sucesso!");
            navigate("/home");

        } catch (error) {
            alert("Nome ou senha inválidos!");
            console.error(error);
        }
    }


    return (
        <div className={estilos.container}>
            <h2 className={estilos.titulo}>FAÇA SEU LOGIN</h2>

            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilos.loginForm}>

                <input
                    {...register("nome")}
                    placeholder="Digite seu nome"
                    className={estilos.inputField}
                />
                {errors.nome && <p className="error">{errors.nome.message}</p>}

                <input
                    {...register("senha")}
                    type="password"
                    placeholder="Digite sua senha"
                    className={estilos.inputField}
                />
                {errors.senha && <p className="error">{errors.senha.message}</p>}
                <button type="submit" className={estilos.submitButton}>
                    ENTRAR
                </button>
            </form>
        </div>
    );
}
