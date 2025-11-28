import React from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from '../styles/Home.module.css';

export function Home() {
    const navigate = useNavigate();

    // 5.1.1. Exibir nome do usuário logado (Assumindo que foi salvo após o login)
    // Se o nome não estiver disponível, podemos usar um valor padrão.
    const username = localStorage.getItem("username") || "Usuário";

    // 5.1.2. Desenvolver um meio para o usuário fazer logout
    const handleLogout = () => {
        // Limpa os tokens e o nome do usuário do armazenamento local
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        
        // Redireciona para a tela de login (assumindo que seja na rota "/")
        navigate("/"); 
    };

    return (
        <div className={estilos.container}>
            <header className={estilos.header}>
                <h1 className={estilos.logo}>
                    Sistema de Gestão 📦
                </h1>
                <div className={estilos.userInfo}>
                    {/* 5.1.1. Exibir nome do usuário logado */}
                    <span>Bem-vindo(a), **{username}**!</span>
                    
                    {/* 5.1.2. Botão de Logout */}
                    <button 
                        className={estilos.logoutButton} 
                        onClick={handleLogout}
                    >
                        Sair
                    </button>
                </div>
            </header>

            <main className={estilos.mainContent}>
                <h2 className={estilos.title}>Interface Principal do Sistema</h2>
                <p className={estilos.subtitle}>Selecione uma das opções abaixo para começar a gerenciar.</p>

                <div className={estilos.cardGrid}>
                    
                    {/* 5.1.3. Acessar "Cadastro de Produto" */}
                    <div 
                        className={estilos.card} 
                        onClick={() => navigate("/cadastro-produto")}
                    >
                        <span className={estilos.cardIcon}>➕</span>
                        <h3 className={estilos.cardTitle}>Cadastro de Produto</h3>
                        <p className={estilos.cardDescription}>Adicione novos itens ao seu inventário.</p>
                    </div>

                    {/* 5.1.4. Acessar "Gestão de Estoque" */}
                    <div 
                        className={estilos.card} 
                        onClick={() => navigate("/gestao-estoque")}
                    >
                        <span className={estilos.cardIcon}>📊</span>
                        <h3 className={estilos.cardTitle}>Gestão de Estoque</h3>
                        <p className={estilos.cardDescription}>Visualize, edite e gerencie o estoque atual.</p>
                    </div>

                </div>
            </main>
        </div>
    );
}