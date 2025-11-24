import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Login";

export function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Login />}>
        {/* <Route index element={<Inicio />} />
        <Route path ='login' element={<Login/>}/>
        <Route path='home' element={<Home/>} />
        <Route path='discprofessor' element={<DisciplinasProfessor/>} />
        <Route path='disciplina' element={<Disciplina/>} />
        <Route path='/adicionardisciplina' element={<DisciplinasCadastrar/>} />
        <Route path="/disciplinas/editar/:id" element={<DisciplinasEditar />} />
        <Route path = 'ambiente' element={<Ambiente/>} />
        <Route path='/adicionarreserva' element={<AmbienteCadastrar/>} />
        <Route path="/reservas/editar/:id" element={<AmbienteEditar/>} />
        <Route path='ambienteprofessor' element={<AmbienteProfessor/>} />
        <Route path='salas' element={<Salas/>} />
        <Route path='/adicionarsala' element={<SalasCadastrar/>} />
        <Route path="/salas/editar/:id" element={<SalasEditar/>} />
        <Route path='salasprofessor' element={<SalasProfessor/>} />
        <Route path='professores' element={<Professores/>} />
        <Route path='/adicionarprofessor' element={<ProfessoresCadastrar/>} />
        <Route path="/professores/editar/:id" element={<ProfessoresEditar/>} />
        <Route path='gestores' element={<Gestores/>} />
        <Route path='/adicionargestor' element={<GestoresCadastrar/>} />
        <Route path="/gestores/editar/:id" element={<GestoresEditar/>} />
        <Route path='sobre_nos' element={<SobreNos/>} /> */}
      </Route>
    </Routes>
  );
}