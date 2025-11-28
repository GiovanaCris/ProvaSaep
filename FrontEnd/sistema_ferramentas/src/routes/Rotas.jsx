import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { CadastrarProduto } from "../pages/CadastrarProduto";
import { Gestao } from "../pages/Gestao";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cadastro-produto" element={<CadastrarProduto />} />
      <Route path="/gestao-estoque" element={<Gestao />} />
    </Routes>
  );
}