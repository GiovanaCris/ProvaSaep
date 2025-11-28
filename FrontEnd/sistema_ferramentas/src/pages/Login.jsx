import axios from "axios";
import { useNavigate } from "react-router-dom";
import estiloslogin from '../styles/Login.module.css';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaLogin = z.object({
    username: z.string()
        .min(1, "Informe o nome")
        .max(20, "Máximo de 20 caracteres"),
    password: z.string()
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
                data  // <-- Envia exatamente username + password
            );

            const { access, refresh } = response.data;

            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            alert("Login realizado com sucesso!");
            navigate("/home");

        } catch (error) {
            console.error(error);
            alert("Nome ou senha inválidos!");
        }
    }

    return (
        <div className={estiloslogin.container}>
            <h2 className={estiloslogin.titulo}>FAÇA SEU LOGIN</h2>

            <form onSubmit={handleSubmit(obterDadosFormulario)} className={estiloslogin.loginForm}>

                <input
                    {...register("username")}
                    placeholder="Digite seu nome"
                    className={estiloslogin.inputField}
                />
                {errors.username && <p className={estiloslogin.error}>{errors.username.message}</p>}

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Digite sua senha"
                    className={estiloslogin.inputField}
                />
                {errors.password && <p className={estiloslogin.error}>{errors.password.message}</p>}

                <button type="submit" className={estiloslogin.submitButton}>
                    ENTRAR
                </button>
            </form>
        </div>
    );
}